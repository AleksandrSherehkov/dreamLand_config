/* Этот файл будет сохранен в браузере (в LocalStorage.settings).
 * В переменной mudprompt хранится много полезной информации о персонаже.
 * Подробнее см. https://github.com/dreamland-mud/mudjs/wiki/MUD-prompt
 * Расшифровка аффектов: https://github.com/dreamland-mud/mudjs/blob/dreamland/src/components/windowletsPanel/windowletsConstants.js
 */ (() => {
  /*--------------------------------------------------------------------------
   * Триггеры и автоматизация для MUD-игры.
   *-------------------------------------------------------------------------*/

  const DEBUG_MODE = true; // true - для вывода отладочной информации

  // Переменные состояния игры, сгруппированные по категориям
  const state = {
    brewing: {
      isActive: false, // Флаг активности процесса варки
      isExhausted: false, // Флаг усталости
    },
    hunting: {
      isActive: false, // Флаг для отслеживания процесса охоты
      attackCommand: 'к ментальный нож',
      victim: 'бан',
      lootItem: 'broken',
      victimLocation: '', // Местоположение жертвы
      isVictimLocationFound: false, // Флаг, что местоположение жертвы найдено
      isLocationCodeFound: false, // Флаг, что код местности найден
      locationCode: '', // Код местности
      isInspecting: false, // Флаг наблюдения
      isVictimKilled: false, // Флаг, указывающий, что жертва убита
      isInCombat: false, // Флаг для отслеживания состояния боя
    },
    training: {
      isActive: false, // Переменная для отслеживания процесса обучения
      skillToTrain: 'к защита от холода',
      skillCount: 0, // Счетчик выполнения навыка
      maxSkillCount: 98, // Максимальное количество повторений
      isMasteryAchieved: false, // Флаг для отслеживания достижения "мастерски владеешь"
      isStarPressed: false, // Флаг для отслеживания нажатия *
    },
    energy: {
      isLow: false, // Флаг для отслеживания низкого уровня энергии
    },
    general: {
      meltCounter: 0, // Противодействие автовыкидыванию
      lastCast: '',
      doorToBash: 'n',
      weapon: 'travellers',
      foodItem: 'гриб',
      sleepItem: 'райс уго',
      isActionLocked: false, // Для предотвращения спама действий
      isLooting: false, // Флаг для отслеживания процесса лутания
    },
  };

  // Деструктуризация state для удобства доступа
  const { hunting, training, energy, general, brewing } = state;

  const logDebug = message => {
    if (DEBUG_MODE) {
      console.log(message);
    }
  };

  // Универсальная функция для отправки команд
  const sendCommand = command => {
    logDebug(`Отправляю команду: ${command}`);
    send(command);
  };

  // Универсальная функция для отправки команды с задержкой
  const delayedSendCommand = (command, delay) => {
    logDebug(`Отложенная команда: ${command} через ${delay} мс`);
    setTimeout(() => sendCommand(command), delay);
  };

  // Триггеры с предкомпилированными регулярными выражениями
  const triggers = [
    {
      pattern: /^Попробуй еще раз.$/,
      action: () => {
        console.log('>>> Повторяем поджиг зелья.');
        sendCommand('к гор роз');
        sendCommand('испол кот');
      },
    },
    {
      pattern:
        /^Ты очень устала. Перед следующей варкой надо немного отдохнуть.$/,
      action: () => {
        console.log('>>> Персонаж устал, начинаем восстановление.');
        brewing.isExhausted = true;
        sendCommand('колдовать освеж');
      },
    },
    {
      pattern: /^Усталость проходит... но лишь на мгновение.$/,
      action: () => {
        console.log('>>> Восстанавливаем энергию.');
        sendCommand('колдовать освеж');
      },
    },
    {
      pattern: /^Усталость проходит, и ты готова к новым свершениям.$/,
      action: () => {
        console.log('>>> Полностью восстановились, продолжаем варку.');
        brewing.isExhausted = false;
        sendCommand('к сотв в кост');
        console.log('>>> brewing.isActive1:', brewing.isActive);
        if (brewing.isActive) startBrewing();
      },
    },
    {
      pattern:
        /^Используя специализированные знания зельеварения, ты изготавливаешь бурлящее снадобье мудреца!$/,
      action: () => {
        sendCommand('взять снадоб из кот');
        sendCommand('осушить снад');
        sendCommand('к сотв в кост');
        console.log('>>> Зелье готово!');
        console.log('>>> brewing.isActive2:', brewing.isActive);
        if (brewing.isActive) startBrewing(); // Автоматически варим следующее зелье
      },
    },
    {
      pattern:
        /^Портативный котел для зелий внезапно раскаляется докрасна, и что-то внутри гулко взрывается!$/,
      action: () => {
        console.log('>>> Котел взорвался! начинаем сначало.');
        sendCommand('к сотв в кост');
        console.log('>>> brewing.isActive3:', brewing.isActive);
        if (brewing.isActive) startBrewing();
      },
    },
    {
      pattern: /ВЫБИЛ.? у тебя .*, и он.? пада.?т .*!/,
      action: () => {
        console.log('>>> Подбираю оружие с пола, очищаю буфер команд.\n');
        sendCommand('\\');
        sendCommand(`взять ${general.weapon}|надеть ${general.weapon}`);
      },
    },
    {
      pattern: /Ты хочешь есть\./,
      action: () => {
        console.log('>>> Сейчас бы шашлычка...\n');
        sendCommand(`колдов сотворить пищу |есть ${general.foodItem}`);
      },
    },
    {
      pattern: /Ты хочешь пить\./,
      action: () => {
        console.log('>>> Сейчас бы вискарика...\n');
        sendCommand('колдов родн |пить род');
      },
    },
    {
      pattern: /У тебя не хватает энергии/,
      action: handleLowEnergy,
    },
  ];

  function playAlertSound() {
    if (!window.speechSynthesis) {
      console.error('Браузер не поддерживает синтез речи.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance('Внимание! Тайфоэн!');
    utterance.lang = 'ru-RU'; // Указываем язык
    utterance.volume = 1; // Громкость (0.0 - 1.0)
    utterance.rate = 1; // Скорость (0.1 - 10)
    utterance.pitch = 1; // Высота тона (0 - 2)

    // Попробуем дождаться завершения предыдущей речи перед началом новой
    window.speechSynthesis.cancel();
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  }

  // Проверяем, не блокирует ли браузер воспроизведение звука
  document.addEventListener(
    'click',
    () => {
      playAlertSound(); // Запускаем звук при клике пользователя (разрешение браузера)
    },
    { once: true }
  ); // Разрешение дается 1 раз
  function startBrewing() {
    console.log('>>> Начинаем варить зелье!');
    brewing.isActive = true;
    brewing.isExhausted = false; // Сбрасываем усталость
    sendCommand('к сотв роз');
    sendCommand('к сотв роз');
    sendCommand('бросить роз');
    sendCommand('пол роз кот');
    sendCommand('к гор роз');
    sendCommand('испол кот');
  }

  function stopBrewing() {
    if (!brewing.isActive) return;

    console.log('>>> Останавливаем варку зелий.');
    brewing.isActive = false;
  }

  let isFileDownloaded = false;
  let accumulatedText = '';
  let parseTimeout = null; // Таймер для отсрочки парсинга

  // Функция для сохранения данных в JSON файл
  const saveToBackend = async data => {
    if (
      Object.keys(data).length === 0 ||
      !data['Название предмета'] ||
      !data['Уровень предмета']
    ) {
      console.log('⚠️ Неполные данные, не отправляем.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      const result = await response.json();
      if (response.ok) {
        echo(
          `✅ Предмет успешно добавлен: ${data['Название предмета']} (${data['Уровень предмета']} ур.)`
        );
        console.log('✅ Предмет отправлен на сервер:', result);
      } else {
        echo(result.message);
        console.warn('❌ Ошибка сервера:', result.message || result);
      }
    } catch (error) {
      console.error('🚫 Ошибка отправки:', error);
      echo(error);
    }
  };

  const isInvalidLine = line => {
    return (
      line.trim() === '' || // Пустая строка
      line.match(/^\<\d+\/\d+зд \d+\/\d+ман \d+\/\d+шг \d+оп Вых/) // Регулярка для строки состояния
    );
  };

  // Функция для парсинга текста
  const parseInputText = text => {
    const parsedData = {};
    const spellList = [];

    const lines = text.split('\n');

    lines.forEach(line => {
      const keyValueMatch = line.match(/^([^:—]+)[—:]+\s*(.*)$/);
      if (keyValueMatch) {
        let key = keyValueMatch[1].trim();
        const value = keyValueMatch[2].trim();

        // Если это строка типа "Заклинание 118 уровня"
        if (/^Заклинани(е|я)\s+\d+\s+уровня:?$/i.test(key.trim())) {
          key = 'Заклинание';
          spellList.push(value);
        } else {
          parsedData[key] = value;
        }
      } else if (line.trim()) {
        const lastKey = Object.keys(parsedData).pop();
        if (lastKey) {
          parsedData[lastKey] += `, ${line.trim()}`;
        }
      }
    });

    // Объединяем все заклинания в одну строку
    if (spellList.length > 0) {
      parsedData['Заклинание'] = spellList.join(', ');
    }

    // Парсим название предмета до символов '--'
    const nameMatch = text.match(/^([^—]+?)\s*--/);
    if (nameMatch) {
      parsedData['Название предмета'] = nameMatch[1].trim();
    }

    // Парсим уровень предмета
    const levelMatch = text.match(/(\d+)\s+уровня/);
    if (levelMatch) {
      parsedData['Уровень предмета'] = levelMatch[1].trim();
    }

    // Парсим использование предмета
    const usageMatch = text.match(
      /(Надевается|Вдевается|Накидывается|Используется|Берется|Опоясывает|Обувается|Кружится).*?\./
    );

    if (usageMatch) {
      parsedData['Использование предмета'] = usageMatch[0].trim();
    }

    // Порядок вывода
    const orderedParsedData = {
      'Название предмета': parsedData['Название предмета'],
      'Уровень предмета': parsedData['Уровень предмета'],
      'Использование предмета': parsedData['Использование предмета'],
      Состав: parsedData['Состав'],
      Заклинание: parsedData['Заклинание'],
      ...parsedData,
    };

    return orderedParsedData;
  };

  function handleLowEnergy() {
    console.log('>>> Энергии не хватает, засыпаю...\n');
    training.skillCount = 0;
    training.isStarPressed = false; // Немедленно останавливаем цикл
    energy.isLow = true; // Устанавливаем флаг низкой энергии
    sendCommand('\\'); // Очищаем буфер команд
    sendCommand(`спать ${general.sleepItem}`); //

    delayedSendCommand('вст', 25000); // Через 25 секунд встаем

    setTimeout(() => {
      training.isStarPressed = true; // Снова запускаем цикл
      energy.isLow = false; // Сбрасываем флаг низкой энергии
      sendCommand(training.skillToTrain); // Повторно вызываем команду
      checkMasteryAndRepeat(''); // Возобновляем проверку мастерства
    }, 26000); // Задержка после отдыха
  }

  // Проверка на "мастерски владеешь" и запуск цикла повторения до выполнения
  function checkMasteryAndRepeat(text) {
    if (general.isActionLocked || !training.isStarPressed) return;

    logDebug(`Функция checkMasteryAndRepeat вызвана с текстом: ${text}`);

    if (text.includes('мастерски владеешь')) {
      sendCommand('\\');
      console.log('Мастерство достигнуто. Очищаем буфер.');
      training.isMasteryAchieved = true;
      training.isStarPressed = false;
      training.isActive = false;
      training.skillCount = 0;
    } else if (training.skillCount >= training.maxSkillCount) {
      sendCommand('\\'); // Очищаем буфер команд
      console.log(
        'Навык выполнен 99 раз. Очищаем буфер и выполняем команду "ум".'
      );
      sendCommand('ум'); // Выполняем команду "ум"
      training.skillCount = 0; // Сбрасываем счетчик
      console.log('Цикл возобновится автоматически.');
      setTimeout(() => {
        sendCommand(training.skillToTrain); // Снова запускаем тренировку после команды "ум"
        checkMasteryAndRepeat(''); // Возобновляем проверку
      }, 1000); // Небольшая задержка перед перезапуском цикла
    } else if (!energy.isLow && !training.isMasteryAchieved) {
      sendCommand(training.skillToTrain);
      training.skillCount++; // Увеличиваем счетчик после каждой команды
      logDebug(`Текущий счетчик навыка: ${training.skillCount}`); // Выводим значение счетчика

      // Устанавливаем флаг блокировки действия
      general.isActionLocked = true;
      setTimeout(() => {
        general.isActionLocked = false; // Разблокируем через 1 секунду
      }, 1000); // Задержка 1 секунда
    }
  }

  // Функция для поиска местоположения жертвы
  function findVictimLocation(text) {
    if (hunting.isVictimLocationFound) return;

    const victimName = hunting.victim.toLowerCase();
    if (text.toLowerCase().includes(victimName)) {
      const parts = text.toLowerCase().split(victimName);
      if (parts.length > 1) {
        hunting.victimLocation = parts[1].trim();
        console.log(`Местоположение жертвы: ${hunting.victimLocation}`);
        hunting.isVictimLocationFound = true;
        sendCommand(`путь ${hunting.victimLocation}`);
      } else {
        console.log('Не удалось найти местоположение.');
      }
    } else {
      console.log('Имя жертвы не найдено.');
    }
  }

  // Функция для поиска кода местности
  function findLocationCode(text) {
    if (!hunting.isVictimLocationFound || hunting.isLocationCodeFound) return;

    const victimLocation = hunting.victimLocation.toLowerCase();
    if (
      text.toLowerCase().includes(`'${victimLocation}':`) &&
      !text.toLowerCase().includes('ты уже здесь')
    ) {
      const pattern = new RegExp(`'${victimLocation}':\\s*(\\S+)`, 'i');
      const match = text.match(pattern);
      const locationCode = match?.[1];
      if (locationCode) {
        hunting.locationCode = locationCode;
        console.log(`Код местности найден: ${hunting.locationCode}`);
        sendCommand(`бег ${hunting.locationCode}`);

        hunting.isInspecting = true;
        hunting.isLocationCodeFound = true;
        sendCommand('смотр');
      } else {
        console.log('Код местности не найден.');
      }
    } else {
      console.log('Не удалось найти код местности.');
    }
  }

  // Функция для обработки встречи с жертвой
  function handleVictimEncounter(text) {
    const victimName = hunting.victim.toLowerCase();
    if (text.toLowerCase().includes(`${victimName} уже труп`)) {
      console.log(`>>> Жертва ${hunting.victim} мертва! Останавливаем охоту.`);
      hunting.isActive = false;
      hunting.isInspecting = false;
      hunting.isVictimKilled = true;
      hunting.isInCombat = false;
      sendCommand('смотр');
    } else if (text.toLowerCase().includes(victimName)) {
      console.log(`>>> Жертва ${hunting.victim} тут!`);
      if (text.toLowerCase().includes('сбегает')) {
        console.log('>>> Жертва пытается сбежать, продолжаем преследование...');
        sendCommand(`где ${hunting.victim}`);
      } else {
        console.log(`>>> Атакую жертву: ${hunting.victim}`);
        delayedSendCommand(`${hunting.attackCommand} ${hunting.victim}`, 3000);
        hunting.isInspecting = false;
        hunting.isInCombat = true;
        continueAttacking();
      }
    } else {
      console.log('>>> Жертва не найдена на текущей локации.');
      hunting.isInspecting = false;
    }
  }

  function continueAttacking() {
    if (!hunting.isInCombat) return;

    sendCommand(`${hunting.attackCommand} ${hunting.victim}`);

    setTimeout(() => {
      continueAttacking();
    }, 3000);
  }

  function handleHuntingState(text) {
    // Если местоположение жертвы ещё не найдено, продолжаем его искать
    if (!hunting.isVictimLocationFound) {
      findVictimLocation(text); // Ищем местоположение жертвы
    }

    // Если местоположение найдено, но код местности ещё нет, продолжаем искать код
    if (hunting.isVictimLocationFound && !hunting.isLocationCodeFound) {
      if (
        text.toLowerCase().includes(`'${hunting.victimLocation}':`) &&
        !text.toLowerCase().includes('ты уже здесь')
      ) {
        findLocationCode(text); // Ищем код местности
      }
    }

    // Если мы находимся в нужной локации, но ещё не отправляли команду "смотр", ждем осмотра
    if (
      hunting.isVictimLocationFound &&
      hunting.isLocationCodeFound &&
      hunting.isInspecting
    ) {
      if (text.toLowerCase().includes(`${hunting.victim}`)) {
        console.log('>>> В локации жертвы, осматриваюсь.');
        handleVictimEncounter(text); // Обрабатываем текст после осмотра
      }
    }
  }

  function handleTrainingState(text) {
    if (text.includes('У тебя не хватает энергии')) {
      handleLowEnergy(); // Вызываем правильную функцию триггера
    } else if (training.isStarPressed && !training.isMasteryAchieved) {
      checkMasteryAndRepeat(text); // Проверяем, достигнуто ли мастерство
    }
  }

  // Обработка текстовых триггеров
  $('.trigger').off('text.myNamespace');
  $('.trigger').on('text.myNamespace', (e, text) => {
    logDebug(`Получен текст из инпута: ${text}`);

    // Если в тексте есть слово "Тайфоэн", воспроизводим звук
    if (text.includes('Тайфоэн')) {
      console.log(
        '>>> Обнаружено упоминание Тайфоэна! Воспроизводим звуковой сигнал.'
      );
      playAlertSound();
    }

    if (text.trim() === 'сказ варить') {
      startBrewing();
      e.preventDefault();
    } else if (text.trim() === 'сказ стоп') {
      stopBrewing();
      e.preventDefault();
    }

    // Фильтруем ненужные строки
    if (isInvalidLine(text)) {
      console.log('⏩ Пропущена ненужная строка.');
      return;
    }

    if (text.startsWith('к опоз ')) {
      accumulatedText = text; // Начинаем запись новой команды
      isFileDownloaded = false; // Сбрасываем флаг
      clearTimeout(parseTimeout); // Очищаем таймер
    } else {
      accumulatedText += `\n${text}`; // Добавляем текст к общему буферу
    }

    // Устанавливаем таймер, чтобы парсинг произошёл через 500 мс после последнего ввода
    clearTimeout(parseTimeout);
    parseTimeout = setTimeout(() => {
      const cleanedText = accumulatedText
        .split('\n')
        .filter(line => !line.trim().startsWith('к опоз'))
        .join('\n');

      const parsedData = parseInputText(cleanedText);
      accumulatedText = ''; // Очищаем после парсинга

      if (Object.keys(parsedData).length > 0) {
        saveToBackend(parsedData); // Сохраняем файл ОДИН раз
      } else {
        console.log('⚠️ Данные не были распознаны.');
      }
    }, 500); // Задержка 500 мс после последнего ввода

    if (hunting.isActive) {
      handleHuntingState(text);
    }

    if (training.isActive) {
      handleTrainingState(text);
    }

    for (const { pattern, action } of triggers) {
      if (pattern.test(text)) {
        action();
        break;
      }
    }

    // Добавляем проверку состояния боя
    if (hunting.isInCombat) {
      const victimName = hunting.victim.toLowerCase();
      if (text.toLowerCase().includes(`${victimName} уже труп`)) {
        console.log(`>>> Жертва ${hunting.victim} мертва!`);
        sendCommand(`взять ${hunting.lootItem}`);
        hunting.isInCombat = false; // Останавливаем атаку
      } else if (text.toLowerCase().includes('ты не видишь здесь такого')) {
        console.log('>>> Жертва недоступна для атаки.');
        hunting.isInCombat = false; // Останавливаем атаку
      } else if (text.toLowerCase().includes('вы не можете сражаться')) {
        console.log('>>> Вы не можете продолжать бой.');
        hunting.isInCombat = false; // Останавливаем атаку
      } else if (text.toLowerCase().includes('вы умерли')) {
        console.log('>>> Вы погибли.');
        hunting.isInCombat = false; // Останавливаем атаку
      }
    }
  });

  // Функция для обработки пользовательских команд
  function processCommand(e, text) {
    const commands = [
      {
        cmd: '/victim',
        handler: args => {
          hunting.victim = args.trim();
          console.log(`>>> Твоя мишень теперь ${hunting.victim}\n`);
        },
      },
      {
        cmd: '/weapon',
        handler: args => {
          general.weapon = args.trim();
          console.log(`>>> Твое оружие теперь ${general.weapon}\n`);
        },
      },
      {
        cmd: '/iden',
        handler: args => {
          sendCommand(`взять ${args} сумка`);
          sendCommand(`к опознание ${args}`);
          sendCommand(`полож ${args} сумка`);
        },
      },
      {
        cmd: '/purge',
        handler: args => {
          sendCommand(`взять ${args} сумка`);
          sendCommand(`бросить ${args}`);
          sendCommand(`жертвовать ${args}`);
        },
      },
      {
        cmd: '/bd',
        handler: args => {
          general.doorToBash = args.trim();
          console.log(
            `>>> Поехали, вышибаем по направлению ${general.doorToBash}\n`
          );
          sendCommand(`выбить ${general.doorToBash}`);
        },
      },
    ];

    const commandObj = commands.find(({ cmd }) => text.startsWith(cmd));
    if (commandObj) {
      const args = text.slice(commandObj.cmd.length).trim();
      commandObj.handler(args);
      e.stopPropagation();
      return true;
    }
    return false;
  }

  $('.trigger').off('input.myNamespace');
  $('.trigger').on('input.myNamespace', (e, text) => {
    processCommand(e, text);
  });

  // Функции для перемещения и действий
  function go(where) {
    sendCommand(where);
  }

  function scan(where) {
    sendCommand(`scan ${where}`);
  }

  function shoot(where) {
    sendCommand(`${hunting.attackCommand}  ${where}.${hunting.victim}`);
  }

  const KeyCodes = {
    Numpad0: 'Numpad0',
    Numpad1: 'Numpad1',
    Numpad2: 'Numpad2',
    Numpad3: 'Numpad3',
    Numpad4: 'Numpad4',
    Numpad5: 'Numpad5',
    Numpad6: 'Numpad6',
    Numpad7: 'Numpad7',
    Numpad8: 'Numpad8',
    Numpad9: 'Numpad9',
    NumpadMultiply: 'NumpadMultiply',
    NumpadAdd: 'NumpadAdd',
    NumpadSubtract: 'NumpadSubtract',
    NumpadDecimal: 'NumpadDecimal',
    NumpadDivide: 'NumpadDivide',
    Escape: 'Escape',
    Backquote: 'Backquote',
    Tab: 'Tab',
    Home: 'Home',
    End: 'End',
  };

  function dir(direction, e) {
    if (e.ctrlKey) {
      shoot(direction);
    } else if (e.altKey) {
      scan(direction);
    } else {
      go(direction);
    }
  }

  function handleMovement(e) {
    const numpadDirectionMap = {
      [KeyCodes.Numpad1]: 'down',
      [KeyCodes.Numpad2]: 'south',
      [KeyCodes.Numpad4]: 'west',
      [KeyCodes.Numpad6]: 'east',
      [KeyCodes.Numpad8]: 'north',
      [KeyCodes.Numpad9]: 'up',
    };

    const direction = numpadDirectionMap[e.code];
    if (direction) {
      dir(direction, e);
      e.preventDefault();
      return true;
    } else if (e.code === KeyCodes.Numpad5) {
      sendCommand('scan');
      e.preventDefault();
      return true;
    }
    return false;
  }

  const buffs = [
    // { prop: 'det', value: 'o', command: 'к диагностика' },
    { prop: 'det', value: 'e', command: 'к обнаружить зло' },
    { prop: 'det', value: 'g', command: 'к обнаружить добро' },
    { prop: 'det', value: 'i', command: 'c detect invis' },
    { prop: 'trv', value: 'i', command: 'c invisibility' },
    { prop: 'det', value: 'r', command: 'c infravision' },
    // { prop: 'pro', value: 's', command: 'к аура' },
    // { prop: 'enh', value: 'b', command: 'к благословение' },
    // { prop: 'enh', value: 'B', command: 'к благость' },
    // { prop: 'trv', value: 'f', command: 'к полет' },
    { prop: 'pro', value: 'S', command: 'c shield' },
    { prop: 'enh', value: 'l', command: 'c learning' },
    { prop: 'enh', value: 'g', command: 'c giant' },
    { prop: 'pro', value: 'p', command: "c 'prot shield'" },
    { prop: 'det', value: 'm', command: 'c detect magic' },
    { prop: 'enh', value: 'h', command: 'c haste' },
    { prop: 'trv', value: 'm', command: 'c mental block' },
    { prop: 'pro', value: 'k', command: 'c stone skin' },
    { prop: 'pro', value: 'z', command: 'c stardust' },
    { prop: 'det', value: 'w', command: 'c improved detect' },
    { prop: 'pro', value: 'D', command: 'c dragon skin' },
    { prop: 'pro', value: 'h', command: 'c protection heat' },
    { prop: 'pro', value: 'a', command: 'c armor' },
    { prop: 'pro', value: 'A', command: 'c enhanced armor' },
    { prop: 'enh', value: 'm', command: 'c magic concentrate' },
    { prop: 'pro', value: 'm', command: 'c spell resistance' },
    { prop: 'enh', value: 'c', command: 'c inaction' },
    { prop: 'pro', value: 'l', command: 'c love potion' },
    { prop: 'pro', value: 'a', command: 'c astral projection' },
    { prop: 'pro', value: 'b', command: 'c broom ritual' },
  ];

  function handleBuffs() {
    buffs.forEach(({ prop, value, command }) => {
      const promptProp = mudprompt[prop];
      if (promptProp === 'none' || !promptProp?.a?.includes(value)) {
        sendCommand(command);
      }
    });
  }

  // Обработчик нажатия клавиш
  $('#input input').off('keydown.myNamespace');
  $('#input input').on('keydown.myNamespace', e => {
    console.log(
      `Key pressed: e.code=${e.code}, e.key=${e.key}, e.keyCode=${e.keyCode}`
    );

    if (handleMovement(e)) return;

    switch (e.code) {
      case KeyCodes.Escape:
        if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
          $('#input input').val('');
        }
        e.preventDefault();
        break;
      case KeyCodes.Backquote:
        handleBuffs();
        e.preventDefault();
        break;
      case KeyCodes.Tab:
        e.preventDefault();
        //  const items = [
        //    'Пламя Тьмы',
        //    'черный шлем с шипами',
        //    'ониксовая серьга',
        //    'портативный котел для зелий',
        //    'тени сумеречных ветров',
        //    'Лето',
        //    'Лето',
        //    'одеяние девственности',
        //    'Осень',
        //    'Наводнение',
        //    'нарукавник могущества',
        //    'нарукавник могущества',
        //    'Мерцающее Кольцо Венздей',
        //    'Мерцающее Кольцо Венздей',
        //    'справедливость лаеркай',
        //    'кинжал путешественника',
        //    'герб',
        //    'Мерцающий Пояс Венздей',
        //    'Весна',
        //    'платиновые сапоги',
        //    'светящаяся сфера',
        //  ];

        //  items.forEach(item => sendCommand(`к огнеупорность ${item}`));

        {
          const commands = ['гиг', 'звезд', 'ускор', 'щит', 'брон', 'зашъ'];
          const targets = ['демон', '1.голем', '2.голем', '3.голем'];
          targets.forEach(target => {
            commands.forEach(command => {
              sendCommand(`приказ демон к ${command} ${target}`);
            });
          });
        }
        break;
      case KeyCodes.NumpadAdd:
        training.isActive = true;
        training.isStarPressed = true;
        training.isMasteryAchieved = false;
        training.skillCount = 0;
        sendCommand(training.skillToTrain);
        checkMasteryAndRepeat('');
        e.preventDefault();
        break;
      case KeyCodes.NumpadSubtract:
        training.isStarPressed = false;
        training.isActive = false;
        training.skillCount = 0;
        console.log('Цикл остановлен при нажатии минуса');
        e.preventDefault();
        break;
      case KeyCodes.Home:
        sendCommand('взять снад сумка:лечение');
        sendCommand('осуш снад');
        e.preventDefault();
        break;
      case KeyCodes.End:
        sendCommand('взять один сумка:лечение');
        sendCommand('надеть один');
        sendCommand('к леч');
        e.preventDefault();
        break;
      case KeyCodes.NumpadMultiply:
        hunting.isActive = true;
        hunting.isVictimLocationFound = false;
        hunting.isLocationCodeFound = false;
        hunting.isInspecting = false;
        sendCommand(`где ${hunting.victim}`);
        console.log('Отправлена команда "где victim".');
        e.preventDefault();
        break;
      default:
        return;
    }
    e.preventDefault();
  });
})();
