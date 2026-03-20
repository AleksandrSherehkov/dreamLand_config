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

    parser: {
      enabled: true,
      debounceMs: 500,
      backendUrl: 'http://localhost:3001/api/items',
      identifyPrefixes: ['к опоз ', 'к опознание '],
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
      defaultVictim: 'рок-менестрель',
      defaultLoot: 'листовка',
      attackIntervalMs: 3000,
      maxCycles: 2, // 1 основной + 1 контрольный
      lootAllCommand: item => `взять все.${item}`,

      questTemplates: [
        {
          key: 'rock-bards',
          match: ['рок-менестрелей', 'концерт тяжелой музыки'],
          victims: ['рок-менестрель'],
          loot: 'листовка',
        },
        {
          key: 'preachers',
          match: ['бродячих проповедников', 'обратить всю территорию'],
          victims: ['проповедник'],
          loot: 'страница',
        },
        {
          key: 'musicians',
          match: ['начинающих музыкантов', 'внезапно обрушилась'],
          victims: ['певица', 'скрипач', 'музыкант'],
          loot: 'струна',
        },
        {
          key: 'bigots',
          match: ['группа ханжей', 'оскорбляет чувства верующих'],
          victims: ['ханжа'],
          loot: 'крупица',
        },
        {
          key: 'bugs',
          match: ['ткань мироздания', 'аномалии'],
          victims: ['крашащая бага', 'толстая бага', 'ксерящая бага'],
          loot: 'кусочек',
        },
      ],
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
      commands: ['гиг', 'неист'],
      targets: ['демон', 'волк'],
    },

    buffs: [
      { prop: 'pro', value: 's', command: 'к аура' },
      { prop: 'enh', value: 'b', command: 'к благословение' },
      { prop: 'pro', value: 'S', command: 'c shield' },
      { prop: 'det', value: 'i', command: 'c detect invis' },
      // { prop: 'trv', value: 'i', command: 'c invisibility' },
      // { prop: 'det', value: 'r', command: 'c infravision' },

      // { prop: 'enh', value: 'b', command: 'приказ крыс к благословение без' },
      // { prop: 'enh', value: 'B', command: 'к благость' },
      { prop: 'trv', value: 'f', command: 'к полет' },

      // { prop: 'pro', value: 'S', command: 'приказ крыс c shield без' },
      { prop: 'enh', value: 'l', command: 'c learning' },
      { prop: 'enh', value: 'g', command: 'c giant' },
      { prop: 'pro', value: 'p', command: "c 'prot shield'" },
      { prop: 'det', value: 'm', command: 'c detect magic' },
      // { prop: 'enh', value: 'h', command: 'c haste' },
      { prop: 'trv', value: 'm', command: 'c mental block' },
      { prop: 'pro', value: 'k', command: 'c stone skin' },
      // { prop: 'pro', value: 'z', command: 'c stardust' },
      // { prop: 'pro', value: 's', command: 'приказ крыс к sanctuary без' },
      { prop: 'det', value: 'w', command: 'c improved detect' },
      { prop: 'pro', value: 'D', command: 'c dragon skin' },
      { prop: 'pro', value: 'h', command: 'c protection heat' },
      { prop: 'pro', value: 'a', command: 'c armor' },
      // { prop: 'pro', value: 'a', command: 'приказ крыс c armor без' },
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
      // { prop: 'det', value: 'h', command: 'приглядеться' },
      { prop: 'det', value: 'g', command: 'к обнаружить добро' },
    ],
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
      isActive: false,
      attackCommand: CONFIG.hunting.defaultAttackCommand,
      victim: CONFIG.hunting.defaultVictim,
      victims: [CONFIG.hunting.defaultVictim],
      victimIndex: 0,
      currentVictim: CONFIG.hunting.defaultVictim,
      lootItem: CONFIG.hunting.defaultLoot,
      victimLocation: '',
      isVictimLocationFound: false,
      isLocationCodeFound: false,
      locationCode: '',
      isInspecting: false,
      isVictimKilled: false,
      isInCombat: false,

      cycleCount: 0, // сколько полных кругов уже завершили
      isControlCheck: false, // сейчас идем по контрольному кругу или нет
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
    parser: {
      isCollecting: false,
      accumulatedText: '',
    },
  };

  const { hunting, training, energy, general, brewing, parser } = state;

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
    return String(str).replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
  }

  const sendCommand = command => {
    log.debug('Отправляю команду:', command);

    if (startsWithIdentifyPrefix(command)) {
      startParserCollection(command);
    }

    send(command);
  };

  function setHuntingQuest({ victims, loot }) {
    if (!Array.isArray(victims) || victims.length === 0) {
      return;
    }

    hunting.victims = victims.map(item => item.toLowerCase());
    hunting.victimIndex = 0;
    hunting.victim = hunting.victims[0];
    hunting.currentVictim = hunting.victim;
    hunting.lootItem = loot;

    hunting.cycleCount = 0;
    hunting.isControlCheck = false;

    log.info(
      `>>> Русалочий квест распознан: цели = ${hunting.victims.join(', ')}, лут = ${hunting.lootItem}`
    );
  }

  function switchToNextVictim(reason = 'не указана') {
    const nextIndex = hunting.victimIndex + 1;

    if (nextIndex >= hunting.victims.length) {
      hunting.cycleCount += 1;

      if (hunting.cycleCount < CONFIG.hunting.maxCycles) {
        hunting.victimIndex = 0;
        hunting.victim = hunting.victims[0];
        hunting.currentVictim = hunting.victim;

        resetCurrentVictimProgress();
        hunting.isControlCheck = true;

        log.warn(
          `>>> Первый проход по всем целям завершен. Запускаю контрольную перепроверку с начала. Причина: ${reason}`
        );

        sendCommand(`${CONFIG.commands.wherePrefix} ${hunting.victim}`);
        return true;
      }

      log.warn(
        `>>> Все цели проверены, включая контрольный круг. Охота остановлена. Причина: ${reason}`
      );
      hunting.isActive = false;
      hunting.isControlCheck = false;
      stopCombat('все цели проверены дважды');
      return false;
    }

    hunting.victimIndex = nextIndex;
    hunting.victim = hunting.victims[nextIndex];
    hunting.currentVictim = hunting.victim;

    resetCurrentVictimProgress();

    log.info(
      `>>> Переключаюсь на следующую цель: ${hunting.victim}. Причина: ${reason}${hunting.isControlCheck ? ' [контрольный круг]' : ''}`
    );
    sendCommand(`${CONFIG.commands.wherePrefix} ${hunting.victim}`);
    return true;
  }

  function detectRusalkQuest(text) {
    const lowerText = text.toLowerCase();

    const matchedQuest = CONFIG.hunting.questTemplates.find(template =>
      template.match.every(fragment =>
        lowerText.includes(fragment.toLowerCase())
      )
    );

    if (!matchedQuest) {
      return false;
    }

    setHuntingQuest({
      victims: matchedQuest.victims,
      loot: matchedQuest.loot,
    });

    return true;
  }

  function getMatchedVictimFromText(text) {
    const lowerText = text.toLowerCase();

    return hunting.victims.find(victim => lowerText.includes(victim));
  }

  function playAlertSound() {
    if (!globalThis.speechSynthesis) {
      log.error('Браузер не поддерживает синтез речи.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(CONFIG.alerts.speechText);
    utterance.lang = CONFIG.alerts.speechLang;
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;

    globalThis.speechSynthesis.cancel();
    clearTimer('speech');

    timers.speech = setTimeout(() => {
      globalThis.speechSynthesis.speak(utterance);
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

  function resetCurrentVictimProgress() {
    hunting.victimLocation = '';
    hunting.isVictimLocationFound = false;
    hunting.isLocationCodeFound = false;
    hunting.locationCode = '';
    hunting.isInspecting = false;
    hunting.isVictimKilled = false;
  }

  function resetHuntingState() {
    hunting.isActive = false;
    resetCurrentVictimProgress();
    hunting.isInCombat = false;
    hunting.victimIndex = 0;
    hunting.currentVictim = hunting.victim;

    hunting.cycleCount = 0;
    hunting.isControlCheck = false;

    clearTimer('attack');
  }

  function stopCombat(reason = 'без указания причины') {
    if (hunting.isInCombat) {
      log.info('>>> Бой остановлен:', reason);
    }

    hunting.isInCombat = false;
    hunting.isInspecting = false;
    clearTimer('attack');
  }

  function startsWithIdentifyPrefix(text) {
    const normalized = String(text).trim().toLowerCase();

    return CONFIG.parser.identifyPrefixes.some(prefix =>
      normalized.startsWith(prefix.toLowerCase())
    );
  }

  function resetParserState() {
    parser.isCollecting = false;
    parser.accumulatedText = '';
    clearTimer('parse');
  }

  function startParserCollection(commandText = '') {
    if (!CONFIG.parser.enabled) {
      return;
    }

    parser.isCollecting = true;
    parser.accumulatedText = commandText ? String(commandText).trim() : '';

    clearTimer('parse');

    log.debug('>>> Парсер предмета активирован.');
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

  function startTraining() {
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

    log.info(
      `>>> Старт тренировки: ${training.skillToTrain}, задержка ${training.skillDelayMs} мс`
    );

    scheduleTrainingTick(0);
  }

  function stopTraining(reason = 'без указания причины') {
    if (!training.isActive) return;

    resetTrainingState();
    log.info(`>>> Тренировка остановлена: ${reason}`);
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

  function handleTrainingMastery(text) {
    if (!training.isActive || !training.isStarPressed) {
      return;
    }

    if (!text.includes('мастерски владеешь')) {
      return;
    }

    log.debug('Обнаружено сообщение о достижении мастерства:', text);
    sendCommand(CONFIG.commands.clearBuffer);
    log.info('Мастерство достигнуто. Очищаем буфер.');
    training.isMasteryAchieved = true;
    resetTrainingState();
  }

  function handleTrainingLowEnergy(text) {
    if (!training.isActive) {
      return;
    }

    if (!text.includes('У тебя не хватает энергии')) {
      return;
    }

    handleLowEnergy();
  }

  function handleTrainingState(text) {
    handleTrainingLowEnergy(text);
    handleTrainingMastery(text);
  }

  /* -------------------------------------------------------------------------- */
  /* HUNTING                                                                     */
  /* -------------------------------------------------------------------------- */

  // Функция для поиска местоположения жертвы
  function findVictimLocation(text) {
    if (hunting.isVictimLocationFound) return;

    const victimName = hunting.victim.toLowerCase();
    const lowerText = text.toLowerCase();

    if (lowerText.includes(`ты не находишь ${victimName}`)) {
      log.warn(`>>> Цель ${victimName} не найдена через "где".`);
      switchToNextVictim('where не нашел цель');
      return;
    }

    if (
      lowerText.includes(
        'увы, никого с таким именем в этой местности обнаружить не удается'
      )
    ) {
      log.warn(`>>> Цель ${victimName} недоступна через "где".`);
      switchToNextVictim('where сообщил, что цель недоступна');
      return;
    }

    if (!lowerText.includes(victimName)) {
      return;
    }

    const parts = lowerText.split(victimName);
    if (parts.length <= 1) {
      log.warn('Не удалось найти местоположение.');
      return;
    }

    const rawLocation = parts[1].trim();
    const normalizedLocation = rawLocation.replace(
      /^[\s.,:;!?-]+|[\s.,:;!?-]+$/g,
      ''
    );

    if (!normalizedLocation || normalizedLocation === '.') {
      log.warn(
        `>>> После имени цели не удалось извлечь корректную местность: "${rawLocation}"`
      );
      switchToNextVictim('не удалось распарсить местность');
      return;
    }

    hunting.victimLocation = normalizedLocation;
    hunting.isVictimLocationFound = true;

    log.info('Местоположение жертвы:', hunting.victimLocation);
    sendCommand(`${CONFIG.commands.pathPrefix} ${hunting.victimLocation}`);
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
      const pattern = new RegExp(
        String.raw`'${safeVictimLocation}':\s*(\S+)`,
        'i'
      );
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
    const lowerText = text.toLowerCase();
    const matchedVictim = getMatchedVictimFromText(lowerText);

    if (!matchedVictim) {
      log.warn('>>> Ни одна из целей не найдена на текущей локации.');
      hunting.isInspecting = false;
      return;
    }

    if (lowerText.includes(`${matchedVictim} уже труп`)) {
      log.info(`>>> Жертва ${matchedVictim} уже мертва! Останавливаем охоту.`);
      hunting.isActive = false;
      hunting.isInspecting = false;
      hunting.isVictimKilled = true;
      hunting.currentVictim = matchedVictim;
      stopCombat('жертва уже мертва');
      sendCommand(CONFIG.commands.look);
      return;
    }

    hunting.currentVictim = matchedVictim;
    log.info(`>>> Жертва ${hunting.currentVictim} тут!`);

    if (lowerText.includes('сбегает')) {
      log.info('>>> Жертва пытается сбежать, продолжаем преследование...');
      sendCommand(`${CONFIG.commands.wherePrefix} ${hunting.currentVictim}`);
      return;
    }

    log.info(`>>> Атакую жертву: ${hunting.currentVictim}`);
    hunting.isInspecting = false;
    hunting.isInCombat = true;

    clearTimer('attack');
    continueAttacking();
  }

  function continueAttacking() {
    clearTimer('attack');

    if (!hunting.isInCombat) {
      log.debug('>>> continueAttacking остановлен: hunting.isInCombat=false');
      return;
    }

    const target = hunting.currentVictim || hunting.victim;

    log.debug('>>> continueAttacking: отправляю атаку', target);
    sendCommand(`${hunting.attackCommand} ${target}`);

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
      if (getMatchedVictimFromText(text)) {
        log.info('>>> В локации жертвы, осматриваюсь.');
        handleVictimEncounter(text);
      }
    }
  }

  /* -------------------------------------------------------------------------- */
  /* PARSER                                                                      */
  /* -------------------------------------------------------------------------- */

  // Отправка распарсенного предмета на бэкенд
  const saveToBackend = async data => {
    if (
      Object.keys(data).length === 0 ||
      !data['Название предмета'] ||
      !data['Уровень предмета']
    ) {
      log.warn('⚠️ Неполные данные, не отправляем.');
      return;
    }

    try {
      const response = await fetch(CONFIG.parser.backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      const rawText = await response.text();

      let result = null;
      if (rawText) {
        try {
          result = JSON.parse(rawText);
        } catch (parseError) {
          log.warn('⚠️ Backend вернул не JSON:', rawText);
        }
      }

      if (response.ok) {
        echo(
          `✅ Предмет успешно добавлен: ${data['Название предмета']} (${data['Уровень предмета']} ур.)`
        );
        log.info('✅ Предмет отправлен на сервер:', result ?? rawText ?? null);
        return;
      }

      const errorMessage =
        result?.message || rawText || `Ошибка сервера (${response.status})`;

      echo(errorMessage);
      log.warn('❌ Ошибка сервера:', {
        status: response.status,
        statusText: response.statusText,
        result,
        rawText,
      });
    } catch (error) {
      log.error('🚫 Ошибка отправки:', error);
      echo(`Ошибка отправки: ${error?.message || error}`);
    }
  };

  const isInvalidLine = line =>
    line.trim() === '' ||
    line.match(/^<\d+\/\d+зд \d+\/\d+ман \d+\/\d+шг \d+оп Вых/);

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
        if (/^Заклинани[ея]\s+\d+\s+уровня:?$/i.test(key.trim())) {
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

  function buildUserCommands() {
    return [
      {
        cmd: '/victim',
        handler: args => {
          const value = args
            .split(',')
            .map(item => item.trim().toLowerCase())
            .filter(Boolean);

          if (value.length === 0) {
            log.info(
              `>>> Текущие цели: ${hunting.victims.join(', ')}, лут: ${hunting.lootItem}\n`
            );
            return;
          }

          hunting.victims = value;
          hunting.victimIndex = 0;
          hunting.victim = value[0];
          hunting.currentVictim = value[0];
          hunting.cycleCount = 0;
          hunting.isControlCheck = false;

          log.info(`>>> Цели охоты: ${hunting.victims.join(', ')}\n`);
        },
      },
      {
        cmd: '/weapon',
        handler: args => {
          const value = args.trim();

          if (!value) {
            log.info(`>>> Текущее оружие: ${general.weapon}\n`);
            return;
          }

          general.weapon = value;
          log.info(`>>> Твое оружие теперь ${general.weapon}\n`);
        },
      },
      {
        cmd: '/iden',
        handler: args => {
          const value = args.trim();
          if (!value) {
            log.warn('>>> Укажи предмет: /iden <предмет>\n');
            return;
          }

          sendCommand(`взять ${value} сумка`);
          sendCommand(`к опознание ${value}`);
          sendCommand(`полож ${value} сумка`);
        },
      },
      {
        cmd: '/purge',
        handler: args => {
          const value = args.trim();
          if (!value) {
            log.warn('>>> Укажи предмет: /purge <предмет>\n');
            return;
          }

          sendCommand(`взять ${value} сумка`);
          sendCommand(`бросить ${value}`);
          sendCommand(`жертвовать ${value}`);
        },
      },
      {
        cmd: '/bd',
        handler: args => {
          const value = args.trim();

          if (!value) {
            log.info(
              `>>> Текущее направление для выбивания: ${general.doorToBash}\n`
            );
            return;
          }

          general.doorToBash = value;
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
            log.warn('>>> Укажи задержку в мс, например: /skilldelay 4000\n');
            return;
          }

          training.skillDelayMs = value;
          log.info(
            `>>> Задержка тренировки установлена: ${training.skillDelayMs} мс\n`
          );
        },
      },
    ];
  }

  const USER_COMMANDS = buildUserCommands();

  function processCommand(e, text) {
    const trimmedText = text.trim();
    const commandObj = USER_COMMANDS.find(({ cmd }) =>
      trimmedText.startsWith(cmd)
    );

    if (!commandObj) {
      return false;
    }

    const args = trimmedText.slice(commandObj.cmd.length).trim();
    commandObj.handler(args);
    e.preventDefault();
    e.stopPropagation();
    return true;
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

  function handleBuffs() {
    const prompt = globalThis.mudprompt || {};

    CONFIG.buffs.forEach(({ prop, value, command }) => {
      const promptProp = prompt[prop];

      if (promptProp === 'none' || !promptProp?.a?.includes(value)) {
        sendCommand(command);
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /* EVENT HELPERS                                                               */
  /* -------------------------------------------------------------------------- */

  function handleTyphoenAlert(text) {
    if (!text.includes(CONFIG.alerts.typhoenText)) {
      return;
    }

    log.warn(
      '>>> Обнаружено упоминание Тайфоэна! Воспроизводим звуковой сигнал.'
    );
    playAlertSound();
  }

  function handleBrewingCommands(e, text) {
    const trimmedText = text.trim();

    if (trimmedText === CONFIG.commands.brewStartText) {
      startBrewing();
      e.preventDefault();
      return true;
    }

    if (trimmedText === CONFIG.commands.brewStopText) {
      stopBrewing();
      e.preventDefault();
      return true;
    }

    return false;
  }

  function getCleanedParsedText(text) {
    return text
      .split('\n')
      .filter(
        line =>
          !line.trim().startsWith('к опоз') &&
          !line.trim().startsWith('к опознание')
      )
      .join('\n');
  }

  function flushParsedText() {
    const cleanedText = getCleanedParsedText(parser.accumulatedText);
    const parsedData = parseInputText(cleanedText);

    resetParserState();

    if (Object.keys(parsedData).length > 0) {
      saveToBackend(parsedData);
    } else {
      log.warn('⚠️ Данные не были распознаны.');
    }
  }

  function updateAccumulatedText(text) {
    if (!parser.isCollecting) {
      return;
    }

    if (!parser.accumulatedText) {
      parser.accumulatedText = text;
      return;
    }

    parser.accumulatedText += `\n${text}`;
  }

  function handleParserText(text) {
    if (!CONFIG.parser.enabled) {
      resetParserState();
      return;
    }

    if (!parser.isCollecting) {
      return;
    }

    if (isInvalidLine(text)) {
      log.info('⏩ Пропущена ненужная строка парсера.');
      return;
    }

    updateAccumulatedText(text);

    clearTimer('parse');
    timers.parse = setTimeout(() => {
      flushParsedText();
    }, CONFIG.parser.debounceMs);
  }

  function runTextTriggers(text) {
    for (const { pattern, action } of triggers) {
      if (pattern.test(text)) {
        action();
        return true;
      }
    }

    return false;
  }

  function handleCombatState(text) {
    if (!hunting.isInCombat) {
      return;
    }

    const lowerText = text.toLowerCase();
    const victimName = (hunting.currentVictim || hunting.victim).toLowerCase();

    if (lowerText.includes(`${victimName} уже труп`)) {
      log.info(`>>> Жертва ${victimName} мертва!`);
      sendCommand(CONFIG.hunting.lootAllCommand(hunting.lootItem));
      stopCombat('жертва убита');
      return;
    }

    if (
      lowerText.includes('ты не видишь здесь такого') ||
      lowerText.includes(
        'увы, никого с таким именем в этой местности обнаружить не удается'
      )
    ) {
      log.warn('>>> Текущая цель недоступна.');
      log.debug('>>> lowerText:', lowerText);

      stopCombat('жертва недоступна');

      if (hunting.isActive && hunting.victims.length > 1) {
        switchToNextVictim('цель пропала или недоступна в бою');
      }

      return;
    }

    if (lowerText.includes('вы не можете сражаться')) {
      log.warn('>>> Вы не можете продолжать бой.');
      stopCombat('бой запрещен');
      return;
    }

    if (lowerText.includes('вы умерли')) {
      log.warn('>>> Вы погибли.');
      stopCombat('персонаж погиб');
    }
  }

  function handleGameStates(text) {
    if (hunting.isActive) {
      handleHuntingState(text);
    }

    if (training.isActive) {
      handleTrainingState(text);
    }

    handleCombatState(text);
  }

  function handleIncomingText(e, text) {
    log.debug('Получен текст из инпута:', text);

    detectRusalkQuest(text);

    handleTyphoenAlert(text);
    handleBrewingCommands(e, text);

    handleParserText(text);

    handleGameStates(text);
    runTextTriggers(text);
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

    log.debug('RAW rpc-prompt snapshot:', structuredClone(data));

    setTimeout(() => {
      log.debug(
        'mudprompt snapshot:',
        structuredClone(globalThis.mudprompt || {})
      );
    }, 0);
  });

  // Обработка текстовых триггеров
  $('.trigger').off('text.myNamespace');
  $('.trigger').on('text.myNamespace', (e, text) => {
    handleIncomingText(e, text);
  });

  // Подписка на пользовательский ввод
  $('.trigger').off('input.myNamespace');
  $('.trigger').on('input.myNamespace', (e, text) => {
    if (startsWithIdentifyPrefix(text)) {
      startParserCollection(text);
    }

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
        startTraining();
        e.preventDefault();
        break;
      case KeyCodes.NumpadSubtract:
        stopTraining('нажата клавиша минус');
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
