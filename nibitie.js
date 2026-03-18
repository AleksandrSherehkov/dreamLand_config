/* Этот файл будет сохранен в браузере (в LocalStorage.settings).
 * В переменной mudprompt хранится много полезной информации о персонаже.
 * Подробнее см. https://github.com/dreamland-mud/mudjs/wiki/MUD-prompt
 * Расшифровка аффектов: https://github.com/dreamland-mud/mudjs/blob/dreamland/src/components/windowletsPanel/windowletsConstants.js
 */
(() => {
  /* -------------------------------------------------------------------------- */
  /* CONFIG                                                                      */
  /* -------------------------------------------------------------------------- */

  const CONFIG = {
    debug: true,

    alerts: {
      typhoenText: 'Тайфоэн',
      speechText: 'Внимание! Тайфоэн!',
      speechLang: 'ru-RU',
      speechDelayMs: 100,
    },

    commands: {
      brewStartText: 'сказ варить',
      brewStopText: 'сказ стоп',
      clearBuffer: '\\',
      standUp: 'вст',
      score: 'ум',
      look: 'смотр',
      wherePrefix: 'где',
      pathPrefix: 'путь',
      runPrefix: 'бег',
      scan: 'scan',
      drink: 'колдов родн |пить род',
      foodPrefix: 'колдов сотворить пищу |есть',
      sleepPrefix: 'спать',
    },

    brewing: {
      createRose: 'к сотв роз',
      dropRose: 'бросить роз',
      putRoseInCauldron: 'пол роз кот',
      igniteRose: 'к гор роз',
      useCauldron: 'испол кот',
      createInCauldron: 'к сотв в кост',
      refreshSpell: 'колдовать освеж',
      takePotionFromCauldron: 'взять снадоб из кот',
      drinkPotion: 'осушить снад',
    },

    training: {
      defaultSkill: 'к щит',
      defaultDelayMs: 4000,
      maxSkillCount: 98,
      unlockDelayMs: 300,
      energyWakeUpDelayMs: 25000,
      energyRecoveryDelayMs: 26000,
    },

    hunting: {
      defaultAttackCommand: 'к вред',
      defaultVictim: 'скрипач',
      defaultLoot: 'струна',
      attackIntervalMs: 3000,
    },

    general: {
      defaultDoorToBash: 'n',
      defaultWeapon: 'молоток',
      defaultFoodItem: 'манна',
      defaultSleepItem: 'кресло',
    },

    quickActions: {
      healPotion: ['взять снад сумка:лечение', 'осуш снад'],
      healCast: ['взять один сумка:лечение', 'надеть один', 'к леч'],
    },

    tabActions: {
      commands: ['гиг', 'щит', 'брон', 'неист'],
      targets: ['демон', 'волк'],
    },
  };

  const DEBUG_MODE = CONFIG.debug;

  const log = {
    debug: (...args) => DEBUG_MODE && console.log('[DEBUG][MUD]', ...args),
    info: (...args) => console.log('[INFO][MUD]', ...args),
    warn: (...args) => console.warn('[WARN][MUD]', ...args),
    error: (...args) => console.error('[ERROR][MUD]', ...args),
  };

  /* -------------------------------------------------------------------------- */
  /* STATE                                                                       */
  /* -------------------------------------------------------------------------- */

  const state = {
    brewing: {
      isActive: false, // Флаг активности процесса варки
      isExhausted: false, // Флаг усталости
    },
    hunting: {
      isActive: false, // Флаг для отслеживания процесса охоты
      attackCommand: CONFIG.hunting.defaultAttackCommand,
      victim: CONFIG.hunting.defaultVictim,
      lootItem: CONFIG.hunting.defaultLoot,
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
      skillToTrain: CONFIG.training.defaultSkill,
      skillDelayMs: CONFIG.training.defaultDelayMs, // ручная задержка между попытками
      lastSkillUsedAt: 0, // время последнего использования навыка
      skillCount: 0, // Счетчик выполнения навыка
      maxSkillCount: CONFIG.training.maxSkillCount, // Максимальное количество повторений
      isMasteryAchieved: false, // Флаг для отслеживания достижения "мастерски владеешь"
      isStarPressed: false, // Флаг для отслеживания нажатия *
    },
    energy: {
      isLow: false, // Флаг для отслеживания низкого уровня энергии
    },
    general: {
      meltCounter: 0, // Противодействие автовыкидыванию
      lastCast: '',
      doorToBash: CONFIG.general.defaultDoorToBash,
      weapon: CONFIG.general.defaultWeapon,
      foodItem: CONFIG.general.defaultFoodItem,
      sleepItem: CONFIG.general.defaultSleepItem,
      isActionLocked: false, // Для предотвращения спама действий
      isLooting: false, // Флаг для отслеживания процесса лутания
    },
  };

  const { hunting, training, energy, general, brewing } = state;

  /* -------------------------------------------------------------------------- */
  /* TIMERS                                                                      */
  /* -------------------------------------------------------------------------- */

  const timers = {
    attack: null,
    training: null,
    trainingUnlock: null,
    energyRecovery: null,
    energyWakeUp: null,
    speech: null,
    parse: null,
  };

  function clearTimer(name) {
    if (timers[name]) {
      clearTimeout(timers[name]);
      timers[name] = null;
    }
  }

  /* -------------------------------------------------------------------------- */
  /* HELPERS                                                                     */
  /* -------------------------------------------------------------------------- */

  function escapeRegExp(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const sendCommand = command => {
    log.debug('Отправляю команду:', command);
    send(command);
  };

  function playAlertSound() {
    if (!window.speechSynthesis) {
      log.error('Браузер не поддерживает синтез речи.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(CONFIG.alerts.speechText);
    utterance.lang = CONFIG.alerts.speechLang;
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    clearTimer('speech');

    timers.speech = setTimeout(() => {
      window.speechSynthesis.speak(utterance);
      timers.speech = null;
    }, CONFIG.alerts.speechDelayMs);
  }

  function resetBrewingState() {
    brewing.isActive = false;
    brewing.isExhausted = false;
  }

  function resetTrainingState() {
    training.isActive = false;
    training.skillCount = 0;
    training.isMasteryAchieved = false;
    training.isStarPressed = false;

    energy.isLow = false;
    general.isActionLocked = false;

    clearTimer('training');
    clearTimer('trainingUnlock');
    clearTimer('energyRecovery');
    clearTimer('energyWakeUp');
  }

  function resetHuntingState() {
    hunting.isActive = false;
    hunting.victimLocation = '';
    hunting.isVictimLocationFound = false;
    hunting.isLocationCodeFound = false;
    hunting.locationCode = '';
    hunting.isInspecting = false;
    hunting.isVictimKilled = false;
    hunting.isInCombat = false;

    clearTimer('attack');
  }

  function stopCombat(reason = 'без указания причины') {
    if (hunting.isInCombat) {
      log.info('>>> Бой остановлен:', reason);
    }

    hunting.isInCombat = false;
    clearTimer('attack');
  }

  /* -------------------------------------------------------------------------- */
  /* BREWING                                                                     */
  /* -------------------------------------------------------------------------- */

  function startBrewing() {
    log.info('>>> Начинаем варить зелье!');
    brewing.isActive = true;
    brewing.isExhausted = false;

    sendCommand(CONFIG.brewing.createRose);
    sendCommand(CONFIG.brewing.createRose);
    sendCommand(CONFIG.brewing.dropRose);
    sendCommand(CONFIG.brewing.putRoseInCauldron);
    sendCommand(CONFIG.brewing.igniteRose);
    sendCommand(CONFIG.brewing.useCauldron);
  }

  function stopBrewing() {
    if (!brewing.isActive) return;

    log.info('>>> Останавливаем варку зелий.');
    resetBrewingState();
  }

  /* -------------------------------------------------------------------------- */
  /* TRAINING                                                                    */
  /* -------------------------------------------------------------------------- */

  function handleLowEnergy() {
    log.warn('>>> Энергии не хватает, засыпаю...');

    clearTimer('training');
    clearTimer('trainingUnlock');
    clearTimer('energyRecovery');
    clearTimer('energyWakeUp');

    training.skillCount = 0;
    training.isStarPressed = false;
    energy.isLow = true;
    general.isActionLocked = false;

    sendCommand(CONFIG.commands.clearBuffer);
    sendCommand(`${CONFIG.commands.sleepPrefix} ${general.sleepItem}`);

    timers.energyWakeUp = setTimeout(() => {
      sendCommand(CONFIG.commands.standUp);
      timers.energyWakeUp = null;
    }, CONFIG.training.energyWakeUpDelayMs);

    timers.energyRecovery = setTimeout(() => {
      if (!training.isActive) {
        energy.isLow = false;
        timers.energyRecovery = null;
        return;
      }

      training.isStarPressed = true;
      energy.isLow = false;
      general.isActionLocked = false;

      scheduleTrainingTick(0);
      timers.energyRecovery = null;
    }, CONFIG.training.energyRecoveryDelayMs);
  }

  function scheduleTrainingTick(delay = null) {
    clearTimer('training');

    if (!training.isActive || !training.isStarPressed || energy.isLow) {
      return;
    }

    const actualDelay =
      typeof delay === 'number' ? delay : training.skillDelayMs;

    timers.training = setTimeout(() => {
      runTrainingTick();
    }, actualDelay);
  }

  function runTrainingTick() {
    timers.training = null;

    if (
      !training.isActive ||
      !training.isStarPressed ||
      energy.isLow ||
      general.isActionLocked
    ) {
      return;
    }

    if (training.isMasteryAchieved) {
      resetTrainingState();
      return;
    }

    if (training.skillCount >= training.maxSkillCount) {
      sendCommand(CONFIG.commands.clearBuffer);
      log.info(
        'Навык выполнен 98 раз. Очищаем буфер и выполняем команду "ум".'
      );
      sendCommand(CONFIG.commands.score);
      training.skillCount = 0;
      scheduleTrainingTick(training.skillDelayMs);
      return;
    }

    training.lastSkillUsedAt = Date.now();
    sendCommand(training.skillToTrain);
    training.skillCount++;
    log.debug('Текущий счетчик навыка:', training.skillCount);

    general.isActionLocked = true;
    clearTimer('trainingUnlock');
    timers.trainingUnlock = setTimeout(() => {
      general.isActionLocked = false;
      timers.trainingUnlock = null;

      if (training.isActive && training.isStarPressed && !energy.isLow) {
        scheduleTrainingTick(training.skillDelayMs);
      }
    }, CONFIG.training.unlockDelayMs);
  }

  function checkMasteryAndRepeat(text) {
    log.debug('Функция checkMasteryAndRepeat вызвана с текстом:', text);

    if (text.includes('мастерски владеешь')) {
      sendCommand(CONFIG.commands.clearBuffer);
      log.info('Мастерство достигнуто. Очищаем буфер.');
      training.isMasteryAchieved = true;
      resetTrainingState();
    }
  }

  function handleTrainingState(text) {
    if (text.includes('У тебя не хватает энергии')) {
      handleLowEnergy();
      return;
    }

    if (training.isActive && training.isStarPressed) {
      checkMasteryAndRepeat(text);
    }
  }

  /* -------------------------------------------------------------------------- */
  /* HUNTING                                                                     */
  /* -------------------------------------------------------------------------- */

  // Функция для поиска местоположения жертвы
  function findVictimLocation(text) {
    if (hunting.isVictimLocationFound) return;

    const victimName = hunting.victim.toLowerCase();
    if (text.toLowerCase().includes(victimName)) {
      const parts = text.toLowerCase().split(victimName);
      if (parts.length > 1) {
        hunting.victimLocation = parts[1].trim();
        log.info('Местоположение жертвы:', hunting.victimLocation);
        hunting.isVictimLocationFound = true;
        sendCommand(`${CONFIG.commands.pathPrefix} ${hunting.victimLocation}`);
      } else {
        log.warn('Не удалось найти местоположение.');
      }
    } else {
      log.warn('Имя жертвы не найдено.');
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
      const safeVictimLocation = escapeRegExp(victimLocation);
      const pattern = new RegExp(`'${safeVictimLocation}':\\s*(\\S+)`, 'i');
      const match = text.match(pattern);
      const locationCode = match?.[1];

      if (locationCode) {
        hunting.locationCode = locationCode;
        log.info(`Код местности найден: ${hunting.locationCode}`);
        sendCommand(`${CONFIG.commands.runPrefix} ${hunting.locationCode}`);

        hunting.isInspecting = true;
        hunting.isLocationCodeFound = true;
        sendCommand(CONFIG.commands.look);
      } else {
        log.warn('Код местности не найден.');
      }
    } else {
      log.warn('Не удалось найти код местности.');
    }
  }

  // Функция для обработки встречи с жертвой
  function handleVictimEncounter(text) {
    const victimName = hunting.victim.toLowerCase();
    const lowerText = text.toLowerCase();

    if (lowerText.includes(`${victimName} уже труп`)) {
      log.info(`>>> Жертва ${hunting.victim} мертва! Останавливаем охоту.`);
      hunting.isActive = false;
      hunting.isInspecting = false;
      hunting.isVictimKilled = true;
      stopCombat('жертва уже мертва');
      sendCommand(CONFIG.commands.look);
      return;
    }

    if (lowerText.includes(victimName)) {
      log.info(`>>> Жертва ${hunting.victim} тут!`);

      if (lowerText.includes('сбегает')) {
        log.info('>>> Жертва пытается сбежать, продолжаем преследование...');
        sendCommand(`${CONFIG.commands.wherePrefix} ${hunting.victim}`);
        return;
      }

      log.info(`>>> Атакую жертву: ${hunting.victim}`);
      hunting.isInspecting = false;
      hunting.isInCombat = true;

      clearTimer('attack');
      timers.attack = setTimeout(() => {
        timers.attack = null;
        continueAttacking();
      }, CONFIG.hunting.attackIntervalMs);

      return;
    }

    log.warn('>>> Жертва не найдена на текущей локации.');
    hunting.isInspecting = false;
  }

  function continueAttacking() {
    clearTimer('attack');

    if (!hunting.isInCombat) return;

    sendCommand(`${hunting.attackCommand} ${hunting.victim}`);

    timers.attack = setTimeout(() => {
      continueAttacking();
    }, CONFIG.hunting.attackIntervalMs);
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
        findLocationCode(text);
      }
    }

    // Если мы находимся в нужной локации, но ещё не отправляли команду "смотр", ждем осмотра
    if (
      hunting.isVictimLocationFound &&
      hunting.isLocationCodeFound &&
      hunting.isInspecting
    ) {
      if (text.toLowerCase().includes(`${hunting.victim}`)) {
        log.info('>>> В локации жертвы, осматриваюсь.');
        handleVictimEncounter(text);
      }
    }
  }

  /* -------------------------------------------------------------------------- */
  /* PARSER                                                                      */
  /* -------------------------------------------------------------------------- */

  let accumulatedText = '';

  // Отправка распарсенного предмета на бэкенд
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
        headers: { 'Content-Type': 'application/json' },
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

  const isInvalidLine = line =>
    line.trim() === '' ||
    line.match(/^\<\d+\/\д+зд \д+\/\д+ман \д+\/\д+шг \д+оп Вых/);

  // Парсер текста предметов
  const parseInputText = text => {
    const parsedData = {};
    const spellList = [];
    const lines = text.split('\n');

    lines.forEach(line => {
      const keyValueMatch = line.match(/^([^:—]+)[—:]+\s*(.*)$/);
      if (keyValueMatch) {
        let key = keyValueMatch[1].trim();
        const value = keyValueMatch[2].trim();

        // "Заклинание 118 уровня"
        if (/^Заклинани(е|я)\s+\d+\s+уровня:?$/i.test(key.trim())) {
          key = 'Заклинание';
          spellList.push(value);
        } else {
          parsedData[key] = value;
        }
      } else if (line.trim()) {
        const lastKey = Object.keys(parsedData).pop();
        if (lastKey) parsedData[lastKey] += `, ${line.trim()}`;
      }
    });

    if (spellList.length > 0) {
      parsedData['Заклинание'] = spellList.join(', ');
    }

    const nameMatch = text.match(/^([^—]+?)\s*--/);
    if (nameMatch) parsedData['Название предмета'] = nameMatch[1].trim();

    const levelMatch = text.match(/(\d+)\s+уровня/);
    if (levelMatch) parsedData['Уровень предмета'] = levelMatch[1].trim();

    const usageMatch = text.match(
      /(Надевается|Вдевается|Накидывается|Используется|Берется|Опоясывает|Обувается|Кружится).*?\./
    );
    if (usageMatch) parsedData['Использование предмета'] = usageMatch[0].trim();

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

  /* -------------------------------------------------------------------------- */
  /* COMMANDS                                                                    */
  /* -------------------------------------------------------------------------- */

  function processCommand(e, text) {
    const commands = [
      {
        cmd: '/victim',
        handler: args => {
          hunting.victim = args.trim();
          log.info(`>>> Твоя мишень теперь ${hunting.victim}\n`);
        },
      },
      {
        cmd: '/weapon',
        handler: args => {
          general.weapon = args.trim();
          log.info(`>>> Твое оружие теперь ${general.weapon}\n`);
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
          log.info(
            `>>> Поехали, вышибаем по направлению ${general.doorToBash}\n`
          );
          sendCommand(`выбить ${general.doorToBash}`);
        },
      },
      {
        cmd: '/skill',
        handler: args => {
          const value = args.trim();
          if (!value) {
            log.info(`>>> Текущий навык: ${training.skillToTrain}\n`);
            return;
          }

          training.skillToTrain = value;
          log.info(`>>> Навык для тренировки: ${training.skillToTrain}\n`);
        },
      },
      {
        cmd: '/skilldelay',
        handler: args => {
          const value = Number(args.trim());

          if (!Number.isFinite(value) || value < 300) {
            log.warn(`>>> Укажи задержку в мс, например: /skilldelay 4000\n`);
            return;
          }

          training.skillDelayMs = value;
          log.info(
            `>>> Задержка тренировки установлена: ${training.skillDelayMs} мс\n`
          );
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

  /* -------------------------------------------------------------------------- */
  /* MOVEMENT                                                                    */
  /* -------------------------------------------------------------------------- */

  // Функции для перемещения и действий
  function go(where) {
    sendCommand(where);
  }

  function scan(where) {
    sendCommand(`${CONFIG.commands.scan} ${where}`);
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

  function getMovementHotkeyName(e) {
    const keypadHotkeys = {
      [KeyCodes.Numpad1]: 'kp1',
      [KeyCodes.Numpad2]: 'kp2',
      [KeyCodes.Numpad4]: 'kp4',
      [KeyCodes.Numpad5]: 'kp5',
      [KeyCodes.Numpad6]: 'kp6',
      [KeyCodes.Numpad8]: 'kp8',
      [KeyCodes.Numpad9]: 'kp9',
    };

    const key = keypadHotkeys[e.code];
    if (!key) {
      return null;
    }

    if (e.ctrlKey) {
      return `ctrl+${key}`;
    }

    if (e.altKey) {
      return `alt+${key}`;
    }

    if (e.shiftKey) {
      return `shift+${key}`;
    }

    return key;
  }

  function hasMovementHotkey(e) {
    const hotkey = getMovementHotkeyName(e);
    if (!hotkey || !localStorage.hotkey) {
      return false;
    }

    try {
      const hotkeyStorage = JSON.parse(localStorage.hotkey);
      return Boolean(hotkeyStorage?.[hotkey]);
    } catch (error) {
      log.warn('Не удалось прочитать hotkey из localStorage', error);
      return false;
    }
  }

  function handleMovement(e) {
    if (hasMovementHotkey(e)) {
      return false;
    }

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
      sendCommand(CONFIG.commands.scan);
      e.preventDefault();
      return true;
    }
    return false;
  }

  /* -------------------------------------------------------------------------- */
  /* BUFFS                                                                       */
  /* -------------------------------------------------------------------------- */

  const buffs = [
    { prop: 'pro', value: 's', command: 'к аура' },
    { prop: 'enh', value: 'b', command: 'к благословение' },
    { prop: 'pro', value: 'S', command: 'c shield' },
    { prop: 'det', value: 'i', command: 'c detect invis' },
    // { prop: 'trv', value: 'i', command: 'c invisibility' },
    // { prop: 'det', value: 'r', command: 'c infravision' },

    //  { prop: 'enh', value: 'b', command: 'приказ крыс к благословение без' },
    // { prop: 'enh', value: 'B', command: 'к благость' },
    { prop: 'trv', value: 'f', command: 'к полет' },

    //  { prop: 'pro', value: 'S', command: 'приказ крыс c shield без' },
    { prop: 'enh', value: 'l', command: 'c learning' },
    { prop: 'enh', value: 'g', command: 'c giant' },
    { prop: 'pro', value: 'p', command: "c 'prot shield'" },
    { prop: 'det', value: 'm', command: 'c detect magic' },
    // { prop: 'enh', value: 'h', command: 'c haste' },
    { prop: 'trv', value: 'm', command: 'c mental block' },
    { prop: 'pro', value: 'k', command: 'c stone skin' },
    // { prop: 'pro', value: 'z', command: 'c stardust' },
    //  { prop: 'pro', value: 's', command: 'приказ крыс к sanctuary без' },
    { prop: 'det', value: 'w', command: 'c improved detect' },
    { prop: 'pro', value: 'D', command: 'c dragon skin' },
    { prop: 'pro', value: 'h', command: 'c protection heat' },
    { prop: 'pro', value: 'a', command: 'c armor' },
    //  { prop: 'pro', value: 'a', command: 'приказ крыс c armor без' },
    { prop: 'pro', value: 'A', command: 'c enhanced armor' },
    // { prop: 'enh', value: 'm', command: 'c magic concentrate' },
    // { prop: 'pro', value: 'm', command: 'c spell resistance' },
    // { prop: 'enh', value: 'c', command: 'c inaction' },
    // { prop: 'pro', value: 'l', command: 'c love potion' },
    // { prop: 'pro', value: 'a', command: 'c astral projection' },
    // { prop: 'pro', value: 'b', command: 'c broom ritual' },
    { prop: 'pro', value: 'g', command: 'c protection good' },
    { prop: 'pro', value: 'e', command: 'c protection evil' },
    // { prop: 'det', value: 'o', command: 'к диагностика' },
    { prop: 'det', value: 'e', command: 'к обнаружить зло' },
    // { prop: 'trv', value: 's', command: 'красться' },
    //  { prop: 'det', value: 'h', command: 'приглядеться' },
    { prop: 'det', value: 'g', command: 'к обнаружить добро' },
  ];

  function handleBuffs() {
    const prompt = window.mudprompt || {};

    buffs.forEach(({ prop, value, command }) => {
      const promptProp = prompt[prop];
      if (promptProp === 'none' || !promptProp?.a?.includes(value)) {
        sendCommand(command);
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /* EVENTS                                                                      */
  /* -------------------------------------------------------------------------- */

  const triggers = [
    {
      pattern: /^Попробуй еще раз.$/,
      action: () => {
        log.info('>>> Повторяем поджиг зелья.');
        sendCommand(CONFIG.brewing.igniteRose);
        sendCommand(CONFIG.brewing.useCauldron);
      },
    },
    {
      pattern:
        /^Ты очень устала. Перед следующей варкой надо немного отдохнуть.$/,
      action: () => {
        log.info('>>> Персонаж устал, начинаем восстановление.');
        brewing.isExhausted = true;
        sendCommand(CONFIG.brewing.refreshSpell);
      },
    },
    {
      pattern: /^Усталость проходит... но лишь на мгновение.$/,
      action: () => {
        log.info('>>> Восстанавливаем энергию.');
        sendCommand(CONFIG.brewing.refreshSpell);
      },
    },
    {
      pattern: /^Усталость проходит, и ты готова к новым свершениям.$/,
      action: () => {
        log.info('>>> Полностью восстановились, продолжаем варку.');
        brewing.isExhausted = false;
        sendCommand(CONFIG.brewing.createInCauldron);
        log.debug('>>> brewing.isActive1:', brewing.isActive);
        if (brewing.isActive) startBrewing();
      },
    },
    {
      pattern:
        /^Используя специализированные знания зельеварения, ты изготавливаешь бурлящее снадобье мудреца!$/,
      action: () => {
        sendCommand(CONFIG.brewing.takePotionFromCauldron);
        sendCommand(CONFIG.brewing.drinkPotion);
        sendCommand(CONFIG.brewing.createInCauldron);
        log.info('>>> Зелье готово!');
        log.debug('>>> brewing.isActive2:', brewing.isActive);
        if (brewing.isActive) startBrewing(); // Автоматически варим следующее зелье
      },
    },
    {
      pattern:
        /^Портативный котел для зелий внезапно раскаляется докрасна, и что-то внутри гулко взрывается!$/,
      action: () => {
        log.info('>>> Котел взорвался! начинаем сначало.');
        sendCommand(CONFIG.brewing.createInCauldron);
        log.debug('>>> brewing.isActive3:', brewing.isActive);
        if (brewing.isActive) startBrewing();
      },
    },
    {
      pattern: /ВЫБИЛ.? у тебя .*, и он.? пада.?т .*!/,
      action: () => {
        log.info('>>> Подбираю оружие с пола, очищаю буфер команд.');
        sendCommand(CONFIG.commands.clearBuffer);
        sendCommand(`взять ${general.weapon}|надеть ${general.weapon}`);
      },
    },
    {
      pattern: /Ты хочешь есть\./,
      action: () => {
        log.info('>>> Сейчас бы шашлычка...');
        sendCommand(`${CONFIG.commands.foodPrefix} ${general.foodItem}`);
      },
    },
    {
      pattern: /Ты хочешь пить\./,
      action: () => {
        log.info('>>> Сейчас бы вискарика...');
        sendCommand(CONFIG.commands.drink);
      },
    },
    {
      pattern: /У тебя не хватает энергии/,
      action: handleLowEnergy,
    },
  ];

  document.addEventListener(
    'click',
    () => {
      playAlertSound();
    },
    { once: true }
  );

  $('#rpc-events').off('rpc-prompt.myNamespace');
  $('#rpc-events').on('rpc-prompt.myNamespace', (e, data) => {
    if (!DEBUG_MODE) return;

    log.debug('RAW rpc-prompt snapshot:', JSON.parse(JSON.stringify(data)));

    setTimeout(() => {
      log.debug(
        'window.mudprompt snapshot:',
        JSON.parse(JSON.stringify(window.mudprompt || {}))
      );
    }, 0);
  });

  // Обработка текстовых триггеров
  $('.trigger').off('text.myNamespace');
  $('.trigger').on('text.myNamespace', (e, text) => {
    log.debug('Получен текст из инпута:', text);

    if (text.includes(CONFIG.alerts.typhoenText)) {
      log.warn(
        '>>> Обнаружено упоминание Тайфоэна! Воспроизводим звуковой сигнал.'
      );
      playAlertSound();
    }

    if (text.trim() === CONFIG.commands.brewStartText) {
      startBrewing();
      e.preventDefault();
    } else if (text.trim() === CONFIG.commands.brewStopText) {
      stopBrewing();
      e.preventDefault();
    }

    if (isInvalidLine(text)) {
      console.log('⏩ Пропущена ненужная строка.');
      return;
    }

    if (text.startsWith('к опоз ')) {
      accumulatedText = text;

      clearTimer('parse');
    } else {
      accumulatedText += `\n${text}`;
    }

    clearTimer('parse');
    timers.parse = setTimeout(() => {
      const cleanedText = accumulatedText
        .split('\n')
        .filter(line => !line.trim().startsWith('к опоз'))
        .join('\n');

      const parsedData = parseInputText(cleanedText);
      accumulatedText = '';

      if (Object.keys(parsedData).length > 0) {
        saveToBackend(parsedData);
      } else {
        console.log('⚠️ Данные не были распознаны.');
      }

      timers.parse = null;
    }, 500);

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

    if (hunting.isInCombat) {
      const lowerText = text.toLowerCase();
      const victimName = hunting.victim.toLowerCase();

      if (lowerText.includes(`${victimName} уже труп`)) {
        log.info(`>>> Жертва ${hunting.victim} мертва!`);
        sendCommand(`взять ${hunting.lootItem}`);
        stopCombat('жертва убита');
      } else if (lowerText.includes('ты не видишь здесь такого')) {
        log.warn('>>> Жертва недоступна для атаки.');
        stopCombat('жертва недоступна');
      } else if (lowerText.includes('вы не можете сражаться')) {
        log.warn('>>> Вы не можете продолжать бой.');
        stopCombat('бой запрещен');
      } else if (lowerText.includes('вы умерли')) {
        log.warn('>>> Вы погибли.');
        stopCombat('персонаж погиб');
      }
    }
  });

  // Подписка на пользовательский ввод
  $('.trigger').off('input.myNamespace');
  $('.trigger').on('input.myNamespace', (e, text) => {
    processCommand(e, text);
  });

  // Обработчик нажатия клавиш
  $('#input input').off('keydown.myNamespace');
  $('#input input').on('keydown.myNamespace', e => {
    log.debug(
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
          const { commands, targets } = CONFIG.tabActions;
          targets.forEach(target => {
            commands.forEach(command => {
              sendCommand(`к ${command} ${target}`);
            });
          });
        }
        break;
      case KeyCodes.NumpadAdd:
        log.info(
          `>>> Старт тренировки: ${training.skillToTrain}, задержка ${training.skillDelayMs} мс`
        );
        clearTimer('training');
        clearTimer('trainingUnlock');
        clearTimer('energyRecovery');
        clearTimer('energyWakeUp');

        training.isActive = true;
        training.isStarPressed = true;
        training.isMasteryAchieved = false;
        training.skillCount = 0;
        energy.isLow = false;
        general.isActionLocked = false;

        scheduleTrainingTick(0);
        e.preventDefault();
        break;
      case KeyCodes.NumpadSubtract:
        resetTrainingState();
        log.info('Цикл остановлен при нажатии минуса');
        e.preventDefault();
        break;
      case KeyCodes.Home:
        CONFIG.quickActions.healPotion.forEach(sendCommand);
        e.preventDefault();
        break;
      case KeyCodes.End:
        CONFIG.quickActions.healCast.forEach(sendCommand);
        e.preventDefault();
        break;
      case KeyCodes.NumpadMultiply:
        resetHuntingState();
        hunting.isActive = true;
        sendCommand(`${CONFIG.commands.wherePrefix} ${hunting.victim}`);
        log.info('Отправлена команда "где victim".');
        e.preventDefault();
        break;
      default:
        return;
    }
    e.preventDefault();
  });
})();
