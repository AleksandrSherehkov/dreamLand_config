/* Этот файл будет сохранен в браузере (в LocalStorage.settings).
 * В переменной mudprompt хранится много полезной информации о персонаже.
 * Подробнее см. https://github.com/dreamland-mud/mudjs/wiki/MUD-prompt
 * Расшифровка аффектов: https://github.com/dreamland-mud/mudjs/blob/dreamland/src/components/windowletsPanel/windowletsConstants.js
 */

(() => {
  /*--------------------------------------------------------------------------
   * Триггеры и автоматизация для MUD-игры.
   *-------------------------------------------------------------------------*/

  const DEBUG_MODE = true; // true - для вывода отладочной информации

  // Переменные состояния игры, сгруппированные по категориям
  const state = {
    hunting: {
      isActive: false, // Флаг для отслеживания процесса охоты
      attackCommand: 'к вред',
      victim: 'скрипач',
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
      skillToTrain: 'к ул броня',
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
      weapon: 'vainglory',
      foodItem: 'манна',
      sleepItem: 'кресло',
      isActionLocked: false, // Для предотвращения спама действий
      isLooting: false, // Флаг для отслеживания процесса лутания
    },
  };

  // Деструктуризация state для удобства доступа
  const { hunting, training, energy, general } = state;

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
        delayedSendCommand(`${hunting.attackCommand} ${hunting.victim}`, 1500);
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
    }, 2000);
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
    { prop: 'det', value: 'o', command: 'к диагностика' },
    { prop: 'det', value: 'e', command: 'к обнаружить зло' },
    { prop: 'det', value: 'g', command: 'к обнаружить добро' },
    { prop: 'det', value: 'i', command: 'c detect invis' },
    { prop: 'trv', value: 'i', command: 'c invisibility' },
    { prop: 'pro', value: 's', command: 'к аура' },
    { prop: 'enh', value: 'b', command: 'к благословение' },
    { prop: 'enh', value: 'B', command: 'к благость' },
    { prop: 'trv', value: 'f', command: 'к полет' },
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
  $(document).off('keydown.myNamespace');
  $(document).on('keydown.myNamespace', e => {
    if (handleMovement(e)) return;

    switch (e.code) {
      case KeyCodes.Escape:
        if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
          $('#input input').val('');
        }
        break;
      case KeyCodes.Backquote:
        handleBuffs();
        break;
      case KeyCodes.Tab:
        {
          const commands = [
            'гиг',
            'аура',
            'неи',
            'щит',
            'брон',
            'благ',
            'полет',
            'благость',
          ];
          const targets = ['д'];
          targets.forEach(target => {
            commands.forEach(command => {
              sendCommand(`к ${command} ${target}`);
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
        break;
      case KeyCodes.NumpadSubtract:
        training.isStarPressed = false;
        training.isActive = false;
        training.skillCount = 0;
        console.log('Цикл остановлен при нажатии минуса');
        break;
      case KeyCodes.Home:
        sendCommand('взять снад сумка:лечение');
        sendCommand('осуш снад');
        break;
      case KeyCodes.End:
        sendCommand('взять один сумка:лечение');
        sendCommand('надеть один');
        sendCommand('к леч');
        break;
      case KeyCodes.NumpadMultiply:
        hunting.isActive = true;
        hunting.isVictimLocationFound = false;
        hunting.isLocationCodeFound = false;
        hunting.isInspecting = false;
        sendCommand(`где ${hunting.victim}`);
        console.log('Отправлена команда "где victim".');
        break;
      default:
        return;
    }
    e.preventDefault();
  });
})();
