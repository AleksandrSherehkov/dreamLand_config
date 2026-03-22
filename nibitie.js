/* Этот файл будет сохранен в браузере (в LocalStorage.settings).
 * В переменной mudprompt хранится много полезной информации о персонаже.
 * Подробнее см. https://github.com/dreamland-mud/mudjs/wiki/MUD-prompt
 * Расшифровка аффектов: https://github.com/dreamland-mud/mudjs/blob/dreamland/src/components/windowletsPanel/windowletsConstants.js
 */
(() => {
  const CONFIG = {
    debug: true,

    logging: {
      debugScopes: {
        CORE: true,
        STATE: true,
        PARSER: true,
        CMD: true,
        TRAIN: true,
        HUNT: true,
        BREW: true,
        EVENT: true,
        UI: true,
        API: true,
      },
    },

    alerts: {
      typhoenText: 'Тайфоэн',
      speechText: 'Внимание! Тайфоэн!',
      weaponDropSpeechText: 'Оружие выбили!',
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
      defaultAttackCommand: 'к утеч',
      defaultVictim: 'рок-менестрель',
      defaultLoot: 'листовка',
      attackIntervalMs: 3000,
      maxCycles: 2,
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

  const NORMALIZED_PARSER_IDENTIFY_PREFIXES =
    CONFIG.parser.identifyPrefixes.map(prefix => prefix.toLowerCase());

  const NORMALIZED_HUNTING_QUEST_TEMPLATES = CONFIG.hunting.questTemplates.map(
    template => ({
      ...template,
      normalizedMatch: template.match.map(fragment => fragment.toLowerCase()),
    })
  );

  const DEBUG_MODE = CONFIG.debug;
  const PREVIOUS_MUD_BOT = globalThis.mudBot;

  const TEXT_PATTERNS = {
    training: {
      lowEnergy: /У тебя не хватает энергии/i,
      mastery: /мастерски владеешь/i,
    },
    combat: {
      targetMissing:
        /ты не видишь здесь такого|увы, никого с таким именем в этой местности обнаружить не удается/i,
      cantFight: /вы не можете сражаться/i,
      death: /вы умерли/i,
      corpseSuffix: /уже труп/i,
    },
    hunting: {
      whereNotFound: /ты не находишь/i,
      whereUnavailable:
        /увы, никого с таким именем в этой местности обнаружить не удается/i,
      alreadyHere: /ты уже здесь/i,
      victimEscapes: /сбегает/i,
      visibleTargetMarker: /\[цель\]/i,
    },
  };

  function isDebugScopeEnabled(scope) {
    if (!DEBUG_MODE) {
      return false;
    }

    return CONFIG.logging?.debugScopes?.[scope] !== false;
  }

  function createLogger(scope) {
    return {
      debug: (...args) =>
        isDebugScopeEnabled(scope) &&
        console.log(`[DEBUG][MUD][${scope}]`, ...args),
      info: (...args) => console.log(`[INFO][MUD][${scope}]`, ...args),
      warn: (...args) => console.warn(`[WARN][MUD][${scope}]`, ...args),
      error: (...args) => console.error(`[ERROR][MUD][${scope}]`, ...args),
      isDebugEnabled: () => isDebugScopeEnabled(scope),
    };
  }

  const coreLog = createLogger('CORE');
  const stateLog = createLogger('STATE');
  const parserLog = createLogger('PARSER');
  const commandsLog = createLogger('CMD');
  const trainingLog = createLogger('TRAIN');
  const huntingLog = createLogger('HUNT');
  const brewingLog = createLogger('BREW');
  const eventLog = createLogger('EVENT');
  const uiLog = createLogger('UI');
  const apiLog = createLogger('API');

  let isBootstrapped = false;

  const HuntingState = {
    normalizeValue(value) {
      return String(value ?? '')
        .trim()
        .toLowerCase();
    },

    normalizeList(values = []) {
      return values.map(value => this.normalizeValue(value)).filter(Boolean);
    },

    setTargets(hunting, victims = []) {
      const normalizedVictims = this.normalizeList(victims);
      const firstVictim = normalizedVictims[0] || '';

      hunting.victims = normalizedVictims;
      hunting.normalizedVictims = normalizedVictims;
      hunting.victim = firstVictim;
      hunting.normalizedVictim = firstVictim;
      hunting.currentVictim = firstVictim;
      hunting.normalizedCurrentVictim = firstVictim;
    },

    setCurrentVictim(hunting, victim) {
      const normalizedVictim = this.normalizeValue(victim);

      hunting.currentVictim = normalizedVictim;
      hunting.normalizedCurrentVictim = normalizedVictim;
    },

    setVictimLocation(hunting, location) {
      const normalizedLocation = this.normalizeValue(location);

      hunting.victimLocation = normalizedLocation;
      hunting.normalizedVictimLocation = normalizedLocation;
    },

    clearVictimLocation(hunting) {
      hunting.victimLocation = '';
      hunting.normalizedVictimLocation = '';
    },
  };

  function createInitialHuntingState() {
    const victim = HuntingState.normalizeValue(CONFIG.hunting.defaultVictim);

    return {
      status: 'idle',
      // idle | locating | pathing | inspecting | fighting | looting | stopped
      phase: 'primary',
      // primary | control
      attackCommand: CONFIG.hunting.defaultAttackCommand,
      victim,
      victims: [victim],
      normalizedVictim: victim,
      normalizedVictims: [victim],
      victimIndex: 0,
      currentVictim: victim,
      normalizedCurrentVictim: victim,
      lootItem: CONFIG.hunting.defaultLoot,
      victimLocation: '',
      normalizedVictimLocation: '',
      locationCode: '',
      cycleCount: 0,
    };
  }

  function createTextContext(rawText) {
    const raw = String(rawText ?? '');

    return {
      raw,
      normalized: raw.toLowerCase(),
      trimmed: raw.trim(),
    };
  }

  const ParserText = {
    toContext(textOrContext) {
      if (
        textOrContext &&
        typeof textOrContext === 'object' &&
        typeof textOrContext.raw === 'string' &&
        typeof textOrContext.normalized === 'string' &&
        typeof textOrContext.trimmed === 'string'
      ) {
        return textOrContext;
      }

      return createTextContext(textOrContext);
    },

    isIdentifyCommand(textOrContext) {
      const ctx = this.toContext(textOrContext);

      return NORMALIZED_PARSER_IDENTIFY_PREFIXES.some(prefix =>
        ctx.normalized.startsWith(prefix)
      );
    },

    isServiceLine(textOrContext) {
      const ctx = this.toContext(textOrContext);

      return (
        ctx.trimmed === '' ||
        /^<\d+\/\d+зд \d+\/\d+ман \d+\/\d+шг \d+оп Вых/.test(ctx.raw)
      );
    },

    normalizeCollectedText(textOrContext) {
      return String(this.toContext(textOrContext).raw)
        .replace(/\r\n?/g, '\n')
        .split('\n')
        .map(line => this.toContext(line))
        .filter(
          lineCtx =>
            !this.isIdentifyCommand(lineCtx) && !this.isServiceLine(lineCtx)
        )
        .map(lineCtx => lineCtx.trimmed)
        .join('\n');
    },
  };

  const TimerManager = {
    timers: Object.create(null),

    clear(name) {
      if (this.timers[name]) {
        clearTimeout(this.timers[name]);
        this.timers[name] = null;
      }
    },

    clearMany(names = []) {
      names.forEach(name => this.clear(name));
    },

    clearAll() {
      Object.keys(this.timers).forEach(name => this.clear(name));
    },

    set(name, callback, delay) {
      this.clear(name);
      this.timers[name] = setTimeout(() => {
        this.timers[name] = null;
        callback();
      }, delay);
      return this.timers[name];
    },
  };

  const Store = {
    state: {
      brewing: {
        status: 'idle',
        // idle | brewing | recovering | stopped
      },
      hunting: createInitialHuntingState(),
      training: {
        status: 'idle',
        // idle | running | waiting_energy | stopped | completed
        skillToTrain: CONFIG.training.defaultSkill,
        skillDelayMs: CONFIG.training.defaultDelayMs,
        lastSkillUsedAt: 0,
        skillCount: 0,
        maxSkillCount: CONFIG.training.maxSkillCount,
      },
      general: {
        meltCounter: 0,
        lastCast: '',
        doorToBash: CONFIG.general.defaultDoorToBash,
        weapon: CONFIG.general.defaultWeapon,
        foodItem: CONFIG.general.defaultFoodItem,
        sleepItem: CONFIG.general.defaultSleepItem,
        isActionLocked: false,
      },
      parser: {
        status: 'idle',
        // idle | collecting
        accumulatedText: '',
      },
    },

    brewing() {
      return this.state.brewing;
    },

    hunting() {
      return this.state.hunting;
    },

    training() {
      return this.state.training;
    },

    general() {
      return this.state.general;
    },

    parser() {
      return this.state.parser;
    },

    get() {
      return this.state;
    },

    patch(path, value) {
      const keys = String(path).split('.').filter(Boolean);
      const lastKey = keys.pop();

      if (!lastKey) {
        return;
      }

      let target = this.state;

      for (const key of keys) {
        if (!target || typeof target !== 'object') {
          return;
        }

        target = target[key];
      }

      if (!target || typeof target !== 'object') {
        return;
      }

      target[lastKey] = value;
    },

    update(section, updater) {
      const target = this.state[section];

      if (!target || typeof updater !== 'function') {
        return;
      }

      updater(target);
    },

    setModuleStatus(moduleName, nextStatus, reason = '') {
      const moduleState = this.get()[moduleName];
      const prevStatus = moduleState.status;

      if (prevStatus === nextStatus) {
        return;
      }

      moduleState.status = nextStatus;

      if (reason) {
        stateLog.info(
          `>>> ${moduleName} status: ${prevStatus} -> ${nextStatus} (${reason})`
        );
        return;
      }

      stateLog.info(`>>> ${moduleName} status: ${prevStatus} -> ${nextStatus}`);
    },

    setBrewingStatus(nextStatus, reason = '') {
      this.setModuleStatus('brewing', nextStatus, reason);
    },

    setHuntingStatus(nextStatus, reason = '') {
      this.setModuleStatus('hunting', nextStatus, reason);
    },

    setTrainingStatus(nextStatus, reason = '') {
      this.setModuleStatus('training', nextStatus, reason);
    },

    setParserStatus(nextStatus, reason = '') {
      this.setModuleStatus('parser', nextStatus, reason);
    },

    setHuntingPhase(nextPhase, reason = '') {
      const hunting = this.hunting();
      const prevPhase = hunting.phase;

      if (prevPhase === nextPhase) {
        return;
      }

      hunting.phase = nextPhase;

      if (reason) {
        stateLog.info(
          `>>> hunting phase: ${prevPhase} -> ${nextPhase} (${reason})`
        );
        return;
      }

      stateLog.info(`>>> hunting phase: ${prevPhase} -> ${nextPhase}`);
    },

    setActionLock(isLocked, reason = '') {
      const general = this.general();
      const nextValue = Boolean(isLocked);
      const prevValue = general.isActionLocked;

      if (prevValue === nextValue) {
        return;
      }

      general.isActionLocked = nextValue;

      if (reason) {
        stateLog.info(
          `>>> action lock: ${prevValue} -> ${nextValue} (${reason})`
        );
        return;
      }

      stateLog.info(`>>> action lock: ${prevValue} -> ${nextValue}`);
    },

    resetBrewingState(status = 'idle') {
      this.update('brewing', brewing => {
        brewing.status = status;
      });

      stateLog.info(`>>> brewing status reset -> ${status}`);
    },

    resetTrainingState(status = 'idle') {
      this.setTrainingStatus(status, 'reset');
      this.update('training', training => {
        training.skillCount = 0;
        training.lastSkillUsedAt = 0;
      });

      this.setActionLock(false, 'reset training');

      TimerManager.clearMany([
        'training',
        'trainingUnlock',
        'energyRecovery',
        'energyWakeUp',
      ]);
    },

    resetCurrentVictimProgress() {
      this.update('hunting', hunting => {
        HuntingState.clearVictimLocation(hunting);
        hunting.locationCode = '';
      });
    },

    resetHuntingState(status = 'idle') {
      this.setHuntingStatus(status, 'reset');
      this.resetCurrentVictimProgress();
      this.setHuntingPhase('primary', 'reset hunting');
      this.update('hunting', hunting => {
        hunting.victimIndex = 0;
        HuntingState.setCurrentVictim(hunting, hunting.victim);
        hunting.cycleCount = 0;
      });

      TimerManager.clear('attack');
    },

    resetParserState() {
      this.setParserStatus('idle', 'reset');
      this.update('parser', parser => {
        parser.accumulatedText = '';
      });
      TimerManager.clear('parse');
    },
  };

  const ParserModule = {
    shouldStart(textOrContext) {
      return ParserText.isIdentifyCommand(textOrContext);
    },

    startsWithIdentifyPrefix(textOrContext) {
      return this.shouldStart(textOrContext);
    },

    startCollection(commandText = '') {
      if (!CONFIG.parser.enabled) {
        return;
      }

      Store.setParserStatus('collecting', 'запуск сбора текста');
      Store.update('parser', parser => {
        parser.accumulatedText = commandText ? String(commandText).trim() : '';
      });
      TimerManager.clear('parse');
      parserLog.debug('>>> Парсер предмета активирован.');
    },

    isInvalidLine(line) {
      return ParserText.isServiceLine(line);
    },

    normalizeItemText(text) {
      return ParserText.normalizeCollectedText(text);
    },

    extractItemFields(text) {
      if (!text) {
        return {};
      }

      const parsedData = {};
      const spellList = [];
      const lines = text.split('\n');

      lines.forEach(line => {
        const keyValueMatch = line.match(/^([^:—]+)[—:]+\s*(.*)$/);
        if (keyValueMatch) {
          let key = keyValueMatch[1].trim();
          const value = keyValueMatch[2].trim();

          if (/^Заклинани[ея]\s+\d+\s+уровня:?$/i.test(key.trim())) {
            key = 'Заклинание';
            spellList.push(value);
          } else {
            parsedData[key] = value;
          }
          return;
        }

        if (!line.trim()) {
          return;
        }

        const lastKey = Object.keys(parsedData).pop();
        if (lastKey) {
          parsedData[lastKey] += `, ${line.trim()}`;
        }
      });

      if (spellList.length > 0) {
        parsedData['Заклинание'] = spellList.join(', ');
      }

      const nameMatch = text.match(/^([^—]+?)\s*--/);
      if (nameMatch) {
        parsedData['Название предмета'] = nameMatch[1].trim();
      }

      const levelMatch = text.match(/(\d+)\s+уровня/);
      if (levelMatch) {
        parsedData['Уровень предмета'] = levelMatch[1].trim();
      }

      const usageMatch = text.match(
        /(Надевается|Вдевается|Накидывается|Используется|Берется|Опоясывает|Обувается|Кружится).*?\./
      );
      if (usageMatch) {
        parsedData['Использование предмета'] = usageMatch[0].trim();
      }

      return {
        ...(parsedData['Название предмета']
          ? { 'Название предмета': parsedData['Название предмета'] }
          : {}),
        ...(parsedData['Уровень предмета']
          ? { 'Уровень предмета': parsedData['Уровень предмета'] }
          : {}),
        ...(parsedData['Использование предмета']
          ? {
              'Использование предмета': parsedData['Использование предмета'],
            }
          : {}),
        ...(parsedData['Состав'] ? { Состав: parsedData['Состав'] } : {}),
        ...(parsedData['Заклинание']
          ? { Заклинание: parsedData['Заклинание'] }
          : {}),
        ...parsedData,
      };
    },

    validateParsedItem(data) {
      const parsedData =
        data && typeof data === 'object' && !Array.isArray(data) ? data : {};
      const missingRequiredFields = [];

      if (!parsedData['Название предмета']) {
        missingRequiredFields.push('Название предмета');
      }

      if (!parsedData['Уровень предмета']) {
        missingRequiredFields.push('Уровень предмета');
      }

      const isValid =
        Object.keys(parsedData).length > 0 &&
        missingRequiredFields.length === 0;

      if (!isValid) {
        parserLog.warn('⚠️ Неполные данные, не отправляем.', {
          missingRequiredFields,
          parsedData,
        });
      }

      return {
        isValid,
        missingRequiredFields,
        data: parsedData,
      };
    },

    async saveItem(data) {
      const validation = this.validateParsedItem(data);
      if (!validation.isValid) {
        return;
      }

      const parsedData = validation.data;

      try {
        const response = await fetch(CONFIG.parser.backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: parsedData }),
        });

        const rawText = await response.text();

        let result = null;
        if (rawText) {
          try {
            result = JSON.parse(rawText);
          } catch (parseError) {
            parserLog.warn('⚠️ Backend вернул не JSON:', rawText, parseError);
          }
        }

        if (response.ok) {
          echo(
            `✅ Предмет успешно добавлен: ${parsedData['Название предмета']} (${parsedData['Уровень предмета']} ур.)`
          );
          parserLog.info(
            '✅ Предмет отправлен на сервер:',
            result ?? rawText ?? null
          );
          return;
        }

        const errorMessage =
          result?.message || rawText || `Ошибка сервера (${response.status})`;

        echo(errorMessage);
        parserLog.warn('❌ Ошибка сервера:', {
          status: response.status,
          statusText: response.statusText,
          result,
          rawText,
        });
      } catch (error) {
        parserLog.error('🚫 Ошибка отправки:', error);
        echo(`Ошибка отправки: ${error?.message || error}`);
      }
    },

    flushParsedText() {
      const normalizedText = this.normalizeItemText(
        Store.parser().accumulatedText
      );
      const parsedData = this.extractItemFields(normalizedText);
      const validation = this.validateParsedItem(parsedData);

      Store.resetParserState();

      if (!normalizedText) {
        parserLog.warn('⚠️ После очистки текст предмета пустой.');
        return;
      }

      if (!Object.keys(parsedData).length) {
        parserLog.warn('⚠️ Данные не были распознаны.');
        return;
      }

      if (!validation.isValid) {
        return;
      }

      this.saveItem(validation.data);
    },

    updateAccumulatedText(text) {
      if (Store.parser().status !== 'collecting') {
        return;
      }

      Store.update('parser', parser => {
        if (!parser.accumulatedText) {
          parser.accumulatedText = text;
          return;
        }

        parser.accumulatedText = `${parser.accumulatedText}\n${text}`;
      });
    },

    handleText(text) {
      const lineCtx = ParserText.toContext(text);

      if (!CONFIG.parser.enabled) {
        Store.resetParserState();
        return;
      }

      if (Store.parser().status !== 'collecting') {
        return;
      }

      if (this.isInvalidLine(lineCtx)) {
        parserLog.info('⏩ Пропущена ненужная строка парсера.');
        return;
      }

      this.updateAccumulatedText(lineCtx.raw);
      TimerManager.set(
        'parse',
        () => {
          this.flushParsedText();
        },
        CONFIG.parser.debounceMs
      );
    },
  };

  const Commands = {
    send(command, options = {}) {
      if (!command || typeof command !== 'string') {
        return;
      }

      const finalOptions = {
        trackParser: true,
        ...options,
      };

      commandsLog.debug('send', { command, options: finalOptions });

      const commandCtx = createTextContext(command);

      if (finalOptions.trackParser && ParserModule.shouldStart(commandCtx)) {
        ParserModule.startCollection(command);
      }

      send(command);
    },

    sendMany(commands = [], options = {}) {
      commands.filter(Boolean).forEach(command => this.send(command, options));
    },

    where(target) {
      this.send(`${CONFIG.commands.wherePrefix} ${target}`);
    },

    path(location) {
      this.send(`${CONFIG.commands.pathPrefix} ${location}`);
    },

    run(code) {
      this.send(`${CONFIG.commands.runPrefix} ${code}`);
    },

    setHuntingTargets(victims, options = {}) {
      if (!Array.isArray(victims) || victims.length === 0) {
        return false;
      }

      Store.update('hunting', hunting => {
        HuntingState.setTargets(hunting, victims);
        hunting.victimIndex = 0;
        hunting.cycleCount = 0;

        if (typeof options.loot === 'string' && options.loot.trim()) {
          hunting.lootItem = options.loot.trim();
        }
      });
      Store.setHuntingPhase('primary', 'обновлены цели охоты');

      return true;
    },

    setHuntingQuest({ victims, loot }) {
      if (!this.setHuntingTargets(victims, { loot })) {
        return;
      }

      const hunting = Store.hunting();

      commandsLog.info(
        `>>> Русалочий квест распознан: цели = ${hunting.victims.join(', ')}, лут = ${hunting.lootItem}`
      );
    },

    userCommands: {
      '/victim': args => {
        const hunting = Store.hunting();
        const value = HuntingState.normalizeList(args.split(','));

        if (value.length === 0) {
          commandsLog.info(
            `>>> Текущие цели: ${hunting.victims.join(', ')}, лут: ${hunting.lootItem}\n`
          );
          return;
        }

        Commands.setHuntingTargets(value);

        const nextHunting = Store.hunting();

        commandsLog.info(`>>> Цели охоты: ${nextHunting.victims.join(', ')}\n`);
      },

      '/weapon': args => {
        const general = Store.general();
        const value = args.trim();

        if (!value) {
          commandsLog.info(`>>> Текущее оружие: ${general.weapon}\n`);
          return;
        }

        Store.patch('general.weapon', value);
        commandsLog.info(`>>> Твое оружие теперь ${Store.general().weapon}\n`);
      },

      '/iden': args => {
        const value = args.trim();
        if (!value) {
          commandsLog.warn('>>> Укажи предмет: /iden <предмет>\n');
          return;
        }

        Commands.sendMany([
          `взять ${value} сумка`,
          `к опознание ${value}`,
          `полож ${value} сумка`,
        ]);
      },

      '/purge': args => {
        const value = args.trim();
        if (!value) {
          commandsLog.warn('>>> Укажи предмет: /purge <предмет>\n');
          return;
        }

        Commands.sendMany([
          `взять ${value} сумка`,
          `бросить ${value}`,
          `жертвовать ${value}`,
        ]);
      },

      '/bd': args => {
        const general = Store.general();
        const value = args.trim();

        if (!value) {
          commandsLog.info(
            `>>> Текущее направление для выбивания: ${general.doorToBash}\n`
          );
          return;
        }

        Store.patch('general.doorToBash', value);
        const nextGeneral = Store.general();
        commandsLog.info(
          `>>> Поехали, вышибаем по направлению ${nextGeneral.doorToBash}\n`
        );
        Commands.send(`выбить ${nextGeneral.doorToBash}`);
      },

      '/skill': args => {
        const training = Store.training();
        const value = args.trim();

        if (!value) {
          commandsLog.info(`>>> Текущий навык: ${training.skillToTrain}\n`);
          return;
        }

        Store.patch('training.skillToTrain', value);
        commandsLog.info(
          `>>> Навык для тренировки: ${Store.training().skillToTrain}\n`
        );
      },

      '/skilldelay': args => {
        const value = Number(args.trim());

        if (!Number.isFinite(value) || value < 300) {
          commandsLog.warn(
            '>>> Укажи задержку в мс, например: /skilldelay 4000\n'
          );
          return;
        }

        Store.patch('training.skillDelayMs', value);
        const training = Store.training();
        commandsLog.info(
          `>>> Задержка тренировки установлена: ${training.skillDelayMs} мс\n`
        );
      },
    },

    processCommand(e, text) {
      const trimmedText = String(text ?? '').trim();

      if (!trimmedText) {
        return false;
      }

      const [command = '', ...rest] = trimmedText.split(/\s+/);
      const args = rest.join(' ').trim();
      const handler = this.userCommands[command];

      if (!handler) {
        return false;
      }

      handler(args);
      e.preventDefault();
      e.stopPropagation();
      return true;
    },
  };

  const TrainingModule = {
    isRunning() {
      return Store.training().status === 'running';
    },

    isWaitingEnergy() {
      return Store.training().status === 'waiting_energy';
    },

    handleLowEnergy() {
      const general = Store.general();

      trainingLog.warn('>>> Энергии не хватает, засыпаю...');

      TimerManager.clearMany([
        'training',
        'trainingUnlock',
        'energyRecovery',
        'energyWakeUp',
      ]);

      Store.update('training', training => {
        training.skillCount = 0;
      });
      Store.setTrainingStatus('waiting_energy', 'недостаточно энергии');
      Store.setActionLock(false, 'ожидание восстановления энергии');

      Commands.send(CONFIG.commands.clearBuffer);
      Commands.send(`${CONFIG.commands.sleepPrefix} ${general.sleepItem}`);

      TimerManager.set(
        'energyWakeUp',
        () => {
          Commands.send(CONFIG.commands.standUp);
        },
        CONFIG.training.energyWakeUpDelayMs
      );

      TimerManager.set(
        'energyRecovery',
        () => {
          if (!this.isWaitingEnergy()) {
            return;
          }

          Store.setTrainingStatus('running', 'энергия восстановлена');
          Store.setActionLock(false, 'энергия восстановлена');
          this.scheduleTick(0);
        },
        CONFIG.training.energyRecoveryDelayMs
      );
    },

    start() {
      const training = Store.training();

      TimerManager.clearMany([
        'training',
        'trainingUnlock',
        'energyRecovery',
        'energyWakeUp',
      ]);

      Store.setTrainingStatus('running', 'запуск тренировки');
      Store.update('training', training => {
        training.skillCount = 0;
      });
      Store.setActionLock(false, 'запуск тренировки');

      trainingLog.info(
        `>>> Старт тренировки: ${training.skillToTrain}, задержка ${training.skillDelayMs} мс`
      );

      this.scheduleTick(0);
    },

    stop(reason = 'без указания причины') {
      const training = Store.training();

      if (training.status === 'idle' || training.status === 'stopped') {
        return;
      }

      Store.resetTrainingState('stopped');
      trainingLog.info(`>>> Тренировка остановлена: ${reason}`);
    },

    scheduleTick(delay = null) {
      const training = Store.training();

      TimerManager.clear('training');

      if (!this.isRunning()) {
        return;
      }

      const actualDelay =
        typeof delay === 'number' ? delay : training.skillDelayMs;

      TimerManager.set(
        'training',
        () => {
          this.runTick();
        },
        actualDelay
      );
    },

    runTick() {
      const general = Store.general();
      const training = Store.training();

      if (!this.isRunning() || general.isActionLocked) {
        return;
      }

      if (training.skillCount >= training.maxSkillCount) {
        Commands.send(CONFIG.commands.clearBuffer);
        trainingLog.info(
          'Навык выполнен 98 раз. Очищаем буфер и выполняем команду "ум".'
        );
        Commands.send(CONFIG.commands.score);
        Store.update('training', training => {
          training.skillCount = 0;
        });
        this.scheduleTick(training.skillDelayMs);
        return;
      }

      const usedAt = Date.now();
      Commands.send(training.skillToTrain);
      Store.update('training', training => {
        training.lastSkillUsedAt = usedAt;
        training.skillCount += 1;
      });
      trainingLog.debug('Текущий счетчик навыка:', Store.training().skillCount);

      Store.setActionLock(true, 'ожидание отката тренировочного действия');
      TimerManager.set(
        'trainingUnlock',
        () => {
          const nextTraining = Store.training();

          Store.setActionLock(
            false,
            'завершение отката тренировочного действия'
          );

          if (this.isRunning()) {
            this.scheduleTick(nextTraining.skillDelayMs);
          }
        },
        CONFIG.training.unlockDelayMs
      );
    },

    handleMastery(text) {
      if (!this.isRunning()) {
        return;
      }

      if (!TEXT_PATTERNS.training.mastery.test(text)) {
        return;
      }

      trainingLog.debug('Обнаружено сообщение о достижении мастерства:', text);
      Commands.send(CONFIG.commands.clearBuffer);
      trainingLog.info('Мастерство достигнуто. Очищаем буфер.');
      Store.resetTrainingState('completed');
    },

    handleLowEnergyText(text) {
      if (!this.isRunning()) {
        return;
      }

      if (!TEXT_PATTERNS.training.lowEnergy.test(text)) {
        return;
      }

      this.handleLowEnergy();
    },

    handleState(text) {
      this.handleLowEnergyText(text);
      this.handleMastery(text);
    },
  };

  const HuntingModule = {
    isFighting() {
      return Store.hunting().status === 'fighting';
    },

    isActive() {
      const status = Store.hunting().status;
      return status !== 'idle' && status !== 'stopped';
    },

    escapeRegExp(str) {
      return String(str).replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
    },

    logPipeline(step, details = '') {
      const {
        status,
        phase,
        victim,
        currentVictim,
        victimLocation,
        locationCode,
      } = Store.hunting();

      huntingLog.debug('hunting pipeline', {
        step,
        status,
        phase,
        victim,
        currentVictim,
        victimLocation,
        locationCode,
        details,
      });
    },

    isVictimVisibleLine(ctx, victim) {
      if (!victim) {
        return false;
      }

      if (!ctx.normalized.includes(victim)) {
        return false;
      }

      return (
        ctx.normalized.includes(`[${victim}]`) ||
        TEXT_PATTERNS.hunting.visibleTargetMarker.test(ctx.raw) ||
        TEXT_PATTERNS.combat.corpseSuffix.test(ctx.raw)
      );
    },

    tryHandleVisibleVictim(ctx) {
      if (!this.isActive() || this.isFighting()) {
        return false;
      }

      const matchedVictim = this.getMatchedVictimFromText(ctx);
      if (!matchedVictim) {
        return false;
      }

      if (!this.isVictimVisibleLine(ctx, matchedVictim)) {
        return false;
      }

      this.logPipeline('visibleVictim', { matchedVictim, text: ctx.raw });
      huntingLog.debug('>>> Цель обнаружена по строке комнаты:', ctx.raw);
      this.onVictimFound(matchedVictim, ctx);
      return true;
    },

    start() {
      const hunting = Store.hunting();

      Store.resetHuntingState('locating');
      this.logPipeline('start', { victim: hunting.victim });
      Commands.where(hunting.victim);
      huntingLog.info('Отправлена команда "где victim".');
    },

    stop(reason = 'без указания причины') {
      this.logPipeline('stop', { reason });
      this.stopAttackLoop(reason);
      Store.setHuntingStatus('stopped', reason);
    },

    stopAttackLoop(reason = 'без указания причины') {
      if (this.isFighting()) {
        huntingLog.info('>>> Бой остановлен:', reason);
      }

      TimerManager.clear('attack');
    },

    nextVictim(reason = 'не указана') {
      const hunting = Store.hunting();
      const nextIndex = hunting.victimIndex + 1;

      this.logPipeline('nextVictim', { reason, nextIndex });

      if (nextIndex >= hunting.victims.length) {
        Store.update('hunting', hunting => {
          hunting.cycleCount += 1;
        });

        if (Store.hunting().cycleCount < CONFIG.hunting.maxCycles) {
          Store.setHuntingPhase('control', 'запуск контрольного круга');
          Store.update('hunting', hunting => {
            hunting.victimIndex = 0;
            hunting.victim = hunting.victims[0];
            hunting.normalizedVictim = hunting.normalizedVictims[0];
            HuntingState.setCurrentVictim(hunting, hunting.victim);
          });

          Store.resetCurrentVictimProgress();
          Store.setHuntingStatus('locating', 'запуск контрольного круга');

          huntingLog.warn(
            `>>> Первый проход по всем целям завершен. Запускаю контрольную перепроверку с начала. Причина: ${reason}`
          );

          const nextHunting = Store.hunting();
          Commands.where(nextHunting.victim);
          return true;
        }

        huntingLog.warn(
          `>>> Все цели проверены, включая контрольный круг. Охота остановлена. Причина: ${reason}`
        );
        this.stop('все цели проверены дважды');
        return false;
      }

      Store.update('hunting', hunting => {
        hunting.victimIndex = nextIndex;
        hunting.victim = hunting.victims[nextIndex];
        hunting.normalizedVictim = hunting.normalizedVictims[nextIndex];
        HuntingState.setCurrentVictim(hunting, hunting.victim);
      });

      Store.resetCurrentVictimProgress();
      const nextHunting = Store.hunting();
      Store.setHuntingStatus(
        'locating',
        `следующая цель: ${nextHunting.victim}`
      );

      huntingLog.info(
        `>>> Переключаюсь на следующую цель: ${nextHunting.victim}. Причина: ${reason}${nextHunting.phase === 'control' ? ' [контрольный круг]' : ''}`
      );
      Commands.where(nextHunting.victim);
      return true;
    },

    onVictimMissing(reason = 'без указания причины') {
      const hunting = Store.hunting();

      this.logPipeline('victimMissing', { reason });

      if (hunting.victims.length > 1) {
        this.stopAttackLoop(reason);
        Store.setHuntingStatus('locating', reason);
        return this.nextVictim(reason);
      }

      this.stop(reason);
      return false;
    },

    onVictimFound(name, ctx = createTextContext('')) {
      const victimName = HuntingState.normalizeValue(name);

      if (!victimName) {
        return false;
      }

      this.logPipeline('victimFound', { victimName, text: ctx.raw });

      if (
        ctx.normalized.includes(victimName) &&
        TEXT_PATTERNS.combat.corpseSuffix.test(ctx.raw)
      ) {
        huntingLog.info(
          `>>> Жертва ${victimName} уже мертва! Останавливаем охоту.`
        );
        Store.update('hunting', hunting => {
          HuntingState.setCurrentVictim(hunting, victimName);
        });
        this.stop('жертва уже мертва');
        Commands.send(CONFIG.commands.look);
        return false;
      }

      Store.update('hunting', hunting => {
        HuntingState.setCurrentVictim(hunting, victimName);
      });
      const hunting = Store.hunting();
      huntingLog.info(`>>> Жертва ${hunting.currentVictim} тут!`);

      if (TEXT_PATTERNS.hunting.victimEscapes.test(ctx.raw)) {
        huntingLog.info(
          '>>> Жертва пытается сбежать, продолжаем преследование...'
        );
        Store.resetCurrentVictimProgress();
        Store.setHuntingStatus('locating', 'цель сбежала');
        Commands.where(hunting.currentVictim);
        return false;
      }

      this.engageCombat(hunting.currentVictim);
      return true;
    },

    onVictimKilled() {
      const hunting = Store.hunting();

      this.logPipeline('victimKilled', {
        victim: hunting.currentVictim || hunting.victim,
      });

      huntingLog.info(
        `>>> Жертва ${hunting.currentVictim || hunting.victim} мертва!`
      );
      Store.setHuntingStatus('looting', `лутание: ${hunting.lootItem}`);
      Commands.send(CONFIG.hunting.lootAllCommand(hunting.lootItem));
      this.stopAttackLoop('жертва убита');
    },

    detectRusalkQuest(ctx) {
      const matchedQuest = NORMALIZED_HUNTING_QUEST_TEMPLATES.find(template =>
        template.normalizedMatch.every(fragment =>
          ctx.normalized.includes(fragment)
        )
      );

      if (!matchedQuest) {
        return false;
      }

      Commands.setHuntingQuest({
        victims: matchedQuest.victims,
        loot: matchedQuest.loot,
      });

      return true;
    },

    getMatchedVictimFromText(ctx) {
      return Store.hunting().normalizedVictims.find(victim =>
        ctx.normalized.includes(victim)
      );
    },

    locateVictim(ctx) {
      const hunting = Store.hunting();

      this.logPipeline('locateVictim', { text: ctx.raw });

      if (hunting.victimLocation) {
        return;
      }

      const victimName = hunting.normalizedVictim;

      if (
        TEXT_PATTERNS.hunting.whereNotFound.test(ctx.raw) &&
        ctx.normalized.includes(victimName)
      ) {
        huntingLog.warn(`>>> Цель ${victimName} не найдена через "где".`);
        this.onVictimMissing('where не нашел цель');
        return;
      }

      if (TEXT_PATTERNS.hunting.whereUnavailable.test(ctx.raw)) {
        huntingLog.warn(`>>> Цель ${victimName} недоступна через "где".`);
        this.onVictimMissing('where сообщил, что цель недоступна');
        return;
      }

      if (!ctx.normalized.includes(victimName)) {
        return;
      }

      const parts = ctx.normalized.split(victimName);
      if (parts.length <= 1) {
        huntingLog.warn('Не удалось найти местоположение.');
        return;
      }

      const rawLocation = parts[1].trim();
      const normalizedLocation = rawLocation.replaceAll(
        /^[\s.,:;!?-]+|[\s.,:;!?-]+$/g,
        ''
      );

      if (!normalizedLocation || normalizedLocation === '.') {
        huntingLog.warn(
          `>>> После имени цели не удалось извлечь корректную местность: "${rawLocation}"`
        );
        this.onVictimMissing('не удалось распарсить местность');
        return;
      }

      Store.update('hunting', hunting => {
        HuntingState.setVictimLocation(hunting, normalizedLocation);
      });
      const nextHunting = Store.hunting();
      Store.setHuntingStatus(
        'pathing',
        `местность: ${nextHunting.victimLocation}`
      );

      huntingLog.info('Местоположение жертвы:', nextHunting.victimLocation);
      Commands.path(nextHunting.victimLocation);
    },

    moveToVictim(locationCode) {
      const hunting = Store.hunting();

      this.logPipeline('moveToVictim', { locationCode });
      Store.setHuntingStatus('inspecting', `код пути: ${hunting.locationCode}`);
      huntingLog.info(`Код местности найден: ${locationCode}`);
      Commands.run(locationCode);
      Commands.send(CONFIG.commands.look);
    },

    resolvePath(ctx) {
      const hunting = Store.hunting();

      this.logPipeline('resolvePath', { text: ctx.raw });

      if (!hunting.victimLocation || hunting.locationCode) {
        return;
      }

      const victimLocation = hunting.normalizedVictimLocation;

      if (TEXT_PATTERNS.hunting.alreadyHere.test(ctx.raw)) {
        return;
      }

      const safeVictimLocation = this.escapeRegExp(victimLocation);
      const pattern = new RegExp(
        String.raw`'${safeVictimLocation}(?:[.:;!?-]+)?'\s*:\s*(\S+)`,
        'i'
      );
      const match = ctx.raw.match(pattern);
      const locationCode = match?.[1];

      if (!locationCode) {
        return;
      }

      Store.patch('hunting.locationCode', locationCode);
      this.moveToVictim(locationCode);
    },

    inspectLocation(ctx) {
      this.logPipeline('inspectLocation', { text: ctx.raw });
      const matchedVictim = this.getMatchedVictimFromText(ctx);

      if (!matchedVictim) {
        return;
      }

      huntingLog.info('>>> В локации жертвы, осматриваюсь.');
      this.onVictimFound(matchedVictim, ctx);
    },

    engageCombat(victimName) {
      if (!victimName) {
        return;
      }

      this.logPipeline('engageCombat', { victimName });
      huntingLog.info(`>>> Атакую жертву: ${victimName}`);
      Store.setHuntingStatus('fighting', `атака цели: ${victimName}`);

      TimerManager.clear('attack');
      this.continueAttacking();
    },

    continueAttacking() {
      const hunting = Store.hunting();

      TimerManager.clear('attack');

      if (!this.isFighting()) {
        huntingLog.debug(
          '>>> continueAttacking остановлен: hunting.status!=fighting'
        );
        return;
      }

      const target = hunting.currentVictim || hunting.victim;

      this.logPipeline('continueAttacking', { target });
      huntingLog.debug('>>> continueAttacking: отправляю атаку', target);
      Commands.send(`${hunting.attackCommand} ${target}`);

      TimerManager.set(
        'attack',
        () => {
          this.continueAttacking();
        },
        CONFIG.hunting.attackIntervalMs
      );
    },

    handleCombatText(ctx) {
      if (!this.isFighting()) {
        return;
      }

      this.logPipeline('handleCombatText', { text: ctx.raw });
      const hunting = Store.hunting();
      const victimName =
        hunting.normalizedCurrentVictim || hunting.normalizedVictim;

      if (
        ctx.normalized.includes(victimName) &&
        TEXT_PATTERNS.combat.corpseSuffix.test(ctx.raw)
      ) {
        this.onVictimKilled();
        return;
      }

      if (TEXT_PATTERNS.combat.targetMissing.test(ctx.raw)) {
        huntingLog.warn('>>> Текущая цель недоступна.');
        huntingLog.debug('>>> lowerText:', ctx.normalized);
        this.onVictimMissing('цель пропала или недоступна в бою');
        return;
      }

      if (TEXT_PATTERNS.combat.cantFight.test(ctx.raw)) {
        huntingLog.warn('>>> Вы не можете продолжать бой.');
        this.stop('бой запрещен');
        return;
      }

      if (TEXT_PATTERNS.combat.death.test(ctx.raw)) {
        huntingLog.warn('>>> Вы погибли.');
        this.stop('персонаж погиб');
      }
    },

    onText(ctx) {
      if (!this.isActive()) {
        return;
      }

      const hunting = Store.hunting();

      this.logPipeline('onText', { text: ctx.raw });

      if (this.tryHandleVisibleVictim(ctx)) {
        return;
      }

      if (hunting.status === 'fighting') {
        this.handleCombatText(ctx);
        return;
      }

      const pipeline = {
        locating: () => this.locateVictim(ctx),
        pathing: () => this.resolvePath(ctx),
        inspecting: () => this.inspectLocation(ctx),
      };

      pipeline[hunting.status]?.();
    },
  };

  const BrewingModule = {
    isRunning() {
      return ['brewing', 'recovering'].includes(Store.brewing().status);
    },

    start() {
      brewingLog.info('>>> Начинаем варить зелье!');
      Store.setBrewingStatus('brewing', 'запуск варки');

      Commands.sendMany([
        CONFIG.brewing.createRose,
        CONFIG.brewing.createRose,
        CONFIG.brewing.dropRose,
        CONFIG.brewing.putRoseInCauldron,
        CONFIG.brewing.igniteRose,
        CONFIG.brewing.useCauldron,
      ]);
    },

    stop() {
      if (
        Store.brewing().status === 'idle' ||
        Store.brewing().status === 'stopped'
      ) {
        return;
      }

      brewingLog.info('>>> Останавливаем варку зелий.');
      Store.resetBrewingState('stopped');
    },

    handleCommands(e, ctx) {
      const trimmedText = ctx.trimmed;

      if (trimmedText === CONFIG.commands.brewStartText) {
        this.start();
        e.preventDefault();
        return true;
      }

      if (trimmedText === CONFIG.commands.brewStopText) {
        this.stop();
        e.preventDefault();
        return true;
      }

      return false;
    },
  };

  const BuffModule = {
    handleBuffs() {
      const prompt = globalThis.mudprompt || {};

      CONFIG.buffs.forEach(({ prop, value, command }) => {
        const promptProp = prompt[prop];

        if (promptProp === 'none' || !promptProp?.a?.includes(value)) {
          Commands.send(command);
        }
      });
    },
  };

  const EventRouter = {
    triggers: [
      {
        pattern: /^Попробуй еще раз.$/,
        action: () => {
          brewingLog.info('>>> Повторяем поджиг зелья.');
          Commands.sendMany([
            CONFIG.brewing.igniteRose,
            CONFIG.brewing.useCauldron,
          ]);
        },
      },
      {
        pattern:
          /^Ты очень устала. Перед следующей варкой надо немного отдохнуть.$/,
        action: () => {
          brewingLog.info('>>> Персонаж устал, начинаем восстановление.');
          Store.setBrewingStatus('recovering', 'усталость после варки');
          Commands.send(CONFIG.brewing.refreshSpell);
        },
      },
      {
        pattern: /^Усталость проходит... но лишь на мгновение.$/,
        action: () => {
          brewingLog.info('>>> Восстанавливаем энергию.');
          Commands.send(CONFIG.brewing.refreshSpell);
        },
      },
      {
        pattern: /^Усталость проходит, и ты готова к новым свершениям.$/,
        action: () => {
          const brewing = Store.brewing();
          brewingLog.info('>>> Полностью восстановились, продолжаем варку.');
          const shouldContinue = BrewingModule.isRunning();
          Commands.send(CONFIG.brewing.createInCauldron);
          brewingLog.debug('>>> brewing.status1:', brewing.status);
          if (shouldContinue) {
            BrewingModule.start();
          }
        },
      },
      {
        pattern:
          /^Используя специализированные знания зельеварения, ты изготавливаешь бурлящее снадобье мудреца!$/,
        action: () => {
          const brewing = Store.brewing();
          const shouldContinue = BrewingModule.isRunning();
          Commands.sendMany([
            CONFIG.brewing.takePotionFromCauldron,
            CONFIG.brewing.drinkPotion,
            CONFIG.brewing.createInCauldron,
          ]);
          brewingLog.info('>>> Зелье готово!');
          brewingLog.debug('>>> brewing.status2:', brewing.status);
          if (shouldContinue) {
            BrewingModule.start();
          }
        },
      },
      {
        pattern:
          /^Портативный котел для зелий внезапно раскаляется докрасна, и что-то внутри гулко взрывается!$/,
        action: () => {
          const brewing = Store.brewing();
          brewingLog.info('>>> Котел взорвался! начинаем сначало.');
          const shouldContinue = BrewingModule.isRunning();
          Commands.send(CONFIG.brewing.createInCauldron);
          brewingLog.debug('>>> brewing.status3:', brewing.status);
          if (shouldContinue) {
            BrewingModule.start();
          }
        },
      },
      {
        pattern: /ВЫБИЛ.? у тебя .*, и он.? пада.?т .*!/,
        action: () => {
          const general = Store.general();
          eventLog.info('>>> Подбираю оружие с пола, очищаю буфер команд.');
          this.playAlertSound(CONFIG.alerts.weaponDropSpeechText);
          Commands.send(CONFIG.commands.clearBuffer);
          Commands.send(`взять ${general.weapon}|надеть ${general.weapon}`);
        },
      },
      {
        pattern: /Ты хочешь есть\./,
        action: () => {
          const general = Store.general();
          eventLog.info('>>> Сейчас бы шашлычка...');
          Commands.send(`${CONFIG.commands.foodPrefix} ${general.foodItem}`);
        },
      },
      {
        pattern: /Ты хочешь пить\./,
        action: () => {
          eventLog.info('>>> Сейчас бы вискарика...');
          Commands.send(CONFIG.commands.drink);
        },
      },
    ],

    playAlertSound(text = CONFIG.alerts.speechText) {
      if (!globalThis.speechSynthesis) {
        eventLog.error('Браузер не поддерживает синтез речи.');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = CONFIG.alerts.speechLang;
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1;

      globalThis.speechSynthesis.cancel();
      TimerManager.set(
        'speech',
        () => {
          globalThis.speechSynthesis.speak(utterance);
        },
        CONFIG.alerts.speechDelayMs
      );
    },

    handleTyphoenAlert(ctx) {
      if (!ctx.raw.includes(CONFIG.alerts.typhoenText)) {
        return;
      }

      eventLog.warn(
        '>>> Обнаружено упоминание Тайфоэна! Воспроизводим звуковой сигнал.'
      );
      this.playAlertSound();
    },

    runTextTriggers(ctx) {
      for (const { pattern, action } of this.triggers) {
        if (pattern.test(ctx.raw)) {
          action();
          return true;
        }
      }

      return false;
    },

    handleGameStates(ctx) {
      HuntingModule.onText(ctx);

      if (TrainingModule.isRunning() || TrainingModule.isWaitingEnergy()) {
        TrainingModule.handleState(ctx.raw);
      }
    },

    handleIncomingText(e, text) {
      const ctx = createTextContext(text);

      eventLog.debug('Получен входящий текст:', ctx.raw);

      HuntingModule.detectRusalkQuest(ctx);
      this.handleTyphoenAlert(ctx);
      ParserModule.handleText(ctx.raw);
      this.handleGameStates(ctx);
      this.runTextTriggers(ctx);
    },
  };

  function exposeDebugApi() {
    globalThis.mudBot = {
      get state() {
        return Store.get();
      },

      get isBootstrapped() {
        return isBootstrapped;
      },

      config: CONFIG,

      bootstrap() {
        bootstrap();
      },

      destroy(reason = 'остановка через mudBot.destroy') {
        destroy(reason);
      },

      send(command, options = {}) {
        Commands.send(command, options);
      },

      sendMany(commands = [], options = {}) {
        Commands.sendMany(commands, options);
      },

      startTraining() {
        TrainingModule.start();
      },

      stopTraining(reason = 'остановка через mudBot') {
        TrainingModule.stop(reason);
      },

      startBrewing() {
        BrewingModule.start();
      },

      stopBrewing() {
        BrewingModule.stop();
      },

      startHunting() {
        HuntingModule.start();
      },

      stopHunting(reason = 'остановка через mudBot') {
        HuntingModule.stop(reason);
      },

      resetHuntingState(status = 'idle') {
        Store.resetHuntingState(status);
      },

      resetTrainingState(status = 'idle') {
        Store.resetTrainingState(status);
      },

      resetParserState() {
        Store.resetParserState();
      },
    };

    apiLog.info('>>> Debug API зарегистрирован в globalThis.mudBot.');
  }

  const UIBindings = {
    documentClickHandler: null,
    hotkeyHandlers: null,

    KeyCodes: {
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
    },

    go(where) {
      Commands.send(where);
    },

    scan(where) {
      Commands.send(`${CONFIG.commands.scan} ${where}`);
    },

    shoot(where) {
      const hunting = Store.hunting();

      Commands.send(`${hunting.attackCommand}  ${where}.${hunting.victim}`);
    },

    dir(direction, e) {
      if (e.ctrlKey) {
        this.shoot(direction);
      } else if (e.altKey) {
        this.scan(direction);
      } else {
        this.go(direction);
      }
    },

    getMovementHotkeyName(e) {
      const keypadHotkeys = {
        [this.KeyCodes.Numpad1]: 'kp1',
        [this.KeyCodes.Numpad2]: 'kp2',
        [this.KeyCodes.Numpad4]: 'kp4',
        [this.KeyCodes.Numpad5]: 'kp5',
        [this.KeyCodes.Numpad6]: 'kp6',
        [this.KeyCodes.Numpad8]: 'kp8',
        [this.KeyCodes.Numpad9]: 'kp9',
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
    },

    hasMovementHotkey(e) {
      const hotkey = this.getMovementHotkeyName(e);
      if (!hotkey || !localStorage.hotkey) {
        return false;
      }

      try {
        const hotkeyStorage = JSON.parse(localStorage.hotkey);
        return Boolean(hotkeyStorage?.[hotkey]);
      } catch (error) {
        uiLog.warn('Не удалось прочитать hotkey из localStorage', error);
        return false;
      }
    },

    handleMovement(e) {
      if (this.hasMovementHotkey(e)) {
        return false;
      }

      const numpadDirectionMap = {
        [this.KeyCodes.Numpad1]: 'down',
        [this.KeyCodes.Numpad2]: 'south',
        [this.KeyCodes.Numpad4]: 'west',
        [this.KeyCodes.Numpad6]: 'east',
        [this.KeyCodes.Numpad8]: 'north',
        [this.KeyCodes.Numpad9]: 'up',
      };

      const direction = numpadDirectionMap[e.code];
      if (direction) {
        this.dir(direction, e);
        e.preventDefault();
        return true;
      }

      if (e.code === this.KeyCodes.Numpad5) {
        Commands.send(CONFIG.commands.scan);
        e.preventDefault();
        return true;
      }

      return false;
    },

    bindDocumentEvents() {
      this.unbindDocumentEvents();

      this.documentClickHandler = () => {
        EventRouter.playAlertSound();
      };

      document.addEventListener('click', this.documentClickHandler, {
        once: true,
      });
    },

    unbindDocumentEvents() {
      if (!this.documentClickHandler) {
        return;
      }

      document.removeEventListener('click', this.documentClickHandler);
      this.documentClickHandler = null;
    },

    bindRpcEvents() {
      $('#rpc-events').off('rpc-prompt.myNamespace');
      $('#rpc-events').on('rpc-prompt.myNamespace', (e, data) => {
        if (!uiLog.isDebugEnabled()) {
          return;
        }

        uiLog.debug('RAW rpc-prompt snapshot:', structuredClone(data));

        setTimeout(() => {
          uiLog.debug(
            'mudprompt snapshot:',
            structuredClone(globalThis.mudprompt || {})
          );
        }, 0);
      });
    },

    bindTextEvents() {
      $('.trigger').off('text.myNamespace');
      $('.trigger').on('text.myNamespace', (e, text) => {
        EventRouter.handleIncomingText(e, text);
      });
    },

    bindInputEvents() {
      $('.trigger').off('input.myNamespace');
      $('.trigger').on('input.myNamespace', (e, text) => {
        const ctx = createTextContext(text);

        if (BrewingModule.handleCommands(e, ctx)) {
          return;
        }

        if (ParserModule.shouldStart(ctx)) {
          ParserModule.startCollection(text);
        }

        if (Commands.processCommand(e, text)) {
          return;
        }
      });
    },

    handleTabActions() {
      const { commands, targets } = CONFIG.tabActions;
      targets.forEach(target => {
        commands.forEach(command => {
          Commands.send(`к ${command} ${target}`);
        });
      });
    },

    buildHotkeyHandlers() {
      this.hotkeyHandlers = {
        [this.KeyCodes.Escape]: e => {
          if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
            $('#input input').val('');
          }
        },
        [this.KeyCodes.Backquote]: () => {
          BuffModule.handleBuffs();
        },
        [this.KeyCodes.Tab]: () => {
          this.handleTabActions();
        },
        [this.KeyCodes.NumpadAdd]: () => {
          TrainingModule.start();
        },
        [this.KeyCodes.NumpadSubtract]: () => {
          TrainingModule.stop('нажата клавиша минус');
        },
        [this.KeyCodes.Home]: () => {
          Commands.sendMany(CONFIG.quickActions.healPotion);
        },
        [this.KeyCodes.End]: () => {
          Commands.sendMany(CONFIG.quickActions.healCast);
        },
        [this.KeyCodes.NumpadMultiply]: () => {
          HuntingModule.start();
        },
      };
    },

    bindKeydownEvents() {
      $('#input input').off('keydown.myNamespace');
      $('#input input').on('keydown.myNamespace', e => {
        uiLog.debug(
          `Key pressed: e.code=${e.code}, e.key=${e.key}, e.keyCode=${e.keyCode}`
        );

        if (this.handleMovement(e)) {
          return;
        }

        const hotkeyHandler = this.hotkeyHandlers?.[e.code];

        if (!hotkeyHandler) {
          return;
        }

        hotkeyHandler(e);
        e.preventDefault();
      });
    },

    init() {
      this.buildHotkeyHandlers();
      this.bindDocumentEvents();
      this.bindRpcEvents();
      this.bindTextEvents();
      this.bindInputEvents();
      this.bindKeydownEvents();
    },

    destroy() {
      this.unbindDocumentEvents();
      this.hotkeyHandlers = null;
      $('.trigger').off('.myNamespace');
      $('#rpc-events').off('.myNamespace');
      $('#input input').off('.myNamespace');
    },
  };

  function bindEvents() {
    UIBindings.init();
  }

  function bootstrap() {
    if (isBootstrapped) {
      destroy('повторный bootstrap');
    }

    bindEvents();
    exposeDebugApi();
    isBootstrapped = true;
    coreLog.info('MUD helper initialized');
  }

  function destroy(reason = 'без указания причины') {
    Store.resetBrewingState('stopped');
    Store.resetTrainingState('stopped');
    Store.resetHuntingState('stopped');
    Store.resetParserState();
    TimerManager.clearAll();
    UIBindings.destroy();
    isBootstrapped = false;
    coreLog.info(`MUD helper destroyed: ${reason}`);
  }

  if (typeof PREVIOUS_MUD_BOT?.destroy === 'function') {
    PREVIOUS_MUD_BOT.destroy('повторная загрузка скрипта');
  }

  bootstrap();
})();
