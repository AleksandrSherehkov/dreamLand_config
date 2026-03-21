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

  const DEBUG_MODE = CONFIG.debug;

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
    },
  };

  const Logger = {
    debug: (...args) => DEBUG_MODE && console.log('[DEBUG][MUD]', ...args),
    info: (...args) => console.log('[INFO][MUD]', ...args),
    warn: (...args) => console.warn('[WARN][MUD]', ...args),
    error: (...args) => console.error('[ERROR][MUD]', ...args),
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
      hunting: {
        status: 'idle',
        // idle | locating | pathing | inspecting | fighting | looting | stopped
        attackCommand: CONFIG.hunting.defaultAttackCommand,
        victim: CONFIG.hunting.defaultVictim,
        victims: [CONFIG.hunting.defaultVictim],
        victimIndex: 0,
        currentVictim: CONFIG.hunting.defaultVictim,
        lootItem: CONFIG.hunting.defaultLoot,
        victimLocation: '',
        locationCode: '',
        cycleCount: 0,
        isControlCheck: false,
      },
      training: {
        status: 'idle',
        // idle | running | waiting_energy | stopped | completed
        skillToTrain: CONFIG.training.defaultSkill,
        skillDelayMs: CONFIG.training.defaultDelayMs,
        lastSkillUsedAt: 0,
        skillCount: 0,
        maxSkillCount: CONFIG.training.maxSkillCount,
      },
      energy: {
        isLow: false,
      },
      general: {
        meltCounter: 0,
        lastCast: '',
        doorToBash: CONFIG.general.defaultDoorToBash,
        weapon: CONFIG.general.defaultWeapon,
        foodItem: CONFIG.general.defaultFoodItem,
        sleepItem: CONFIG.general.defaultSleepItem,
        isActionLocked: false,
        isLooting: false,
      },
      parser: {
        isCollecting: false,
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

    energy() {
      return this.state.energy;
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
        Logger.info(
          `>>> ${moduleName} status: ${prevStatus} -> ${nextStatus} (${reason})`
        );
        return;
      }

      Logger.info(`>>> ${moduleName} status: ${prevStatus} -> ${nextStatus}`);
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

    resetBrewingState(status = 'idle') {
      this.setBrewingStatus(status, 'reset');
    },

    resetTrainingState(status = 'idle') {
      this.setTrainingStatus(status, 'reset');
      this.update('training', training => {
        training.skillCount = 0;
      });

      this.update('energy', energy => {
        energy.isLow = false;
      });

      this.update('general', general => {
        general.isActionLocked = false;
      });

      TimerManager.clearMany([
        'training',
        'trainingUnlock',
        'energyRecovery',
        'energyWakeUp',
      ]);
    },

    resetCurrentVictimProgress() {
      this.update('hunting', hunting => {
        hunting.victimLocation = '';
        hunting.locationCode = '';
      });
    },

    resetHuntingState(status = 'idle') {
      this.setHuntingStatus(status, 'reset');
      this.resetCurrentVictimProgress();
      this.update('hunting', hunting => {
        hunting.victimIndex = 0;
        hunting.currentVictim = hunting.victim;
        hunting.cycleCount = 0;
        hunting.isControlCheck = false;
      });

      TimerManager.clear('attack');
    },

    resetParserState() {
      this.update('parser', parser => {
        parser.isCollecting = false;
        parser.accumulatedText = '';
      });
      TimerManager.clear('parse');
    },
  };

  const ParserModule = {
    shouldStart(text) {
      const normalized = String(text).trim().toLowerCase();

      return CONFIG.parser.identifyPrefixes.some(prefix =>
        normalized.startsWith(prefix.toLowerCase())
      );
    },

    startsWithIdentifyPrefix(text) {
      return this.shouldStart(text);
    },

    startCollection(commandText = '') {
      if (!CONFIG.parser.enabled) {
        return;
      }

      Store.update('parser', parser => {
        parser.isCollecting = true;
        parser.accumulatedText = commandText ? String(commandText).trim() : '';
      });
      TimerManager.clear('parse');
      Logger.debug('>>> Парсер предмета активирован.');
    },

    isInvalidLine(line) {
      return (
        line.trim() === '' ||
        line.match(/^<\d+\/\d+зд \d+\/\d+ман \d+\/\d+шг \d+оп Вых/)
      );
    },

    async saveToBackend(data) {
      if (
        Object.keys(data).length === 0 ||
        !data['Название предмета'] ||
        !data['Уровень предмета']
      ) {
        Logger.warn('⚠️ Неполные данные, не отправляем.');
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
            Logger.warn('⚠️ Backend вернул не JSON:', rawText, parseError);
          }
        }

        if (response.ok) {
          echo(
            `✅ Предмет успешно добавлен: ${data['Название предмета']} (${data['Уровень предмета']} ур.)`
          );
          Logger.info(
            '✅ Предмет отправлен на сервер:',
            result ?? rawText ?? null
          );
          return;
        }

        const errorMessage =
          result?.message || rawText || `Ошибка сервера (${response.status})`;

        echo(errorMessage);
        Logger.warn('❌ Ошибка сервера:', {
          status: response.status,
          statusText: response.statusText,
          result,
          rawText,
        });
      } catch (error) {
        Logger.error('🚫 Ошибка отправки:', error);
        echo(`Ошибка отправки: ${error?.message || error}`);
      }
    },

    parseInputText(text) {
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
        } else if (line.trim()) {
          const lastKey = Object.keys(parsedData).pop();
          if (lastKey) {
            parsedData[lastKey] += `, ${line.trim()}`;
          }
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
        'Название предмета': parsedData['Название предмета'],
        'Уровень предмета': parsedData['Уровень предмета'],
        'Использование предмета': parsedData['Использование предмета'],
        Состав: parsedData['Состав'],
        Заклинание: parsedData['Заклинание'],
        ...parsedData,
      };
    },

    getCleanedParsedText(text) {
      return text
        .split('\n')
        .filter(
          line =>
            !line.trim().startsWith('к опоз') &&
            !line.trim().startsWith('к опознание')
        )
        .join('\n');
    },

    flushParsedText() {
      const cleanedText = this.getCleanedParsedText(
        Store.parser().accumulatedText
      );
      const parsedData = this.parseInputText(cleanedText);

      Store.resetParserState();

      if (Object.keys(parsedData).length > 0) {
        this.saveToBackend(parsedData);
      } else {
        Logger.warn('⚠️ Данные не были распознаны.');
      }
    },

    updateAccumulatedText(text) {
      if (!Store.parser().isCollecting) {
        return;
      }

      if (!Store.parser().accumulatedText) {
        Store.patch('parser.accumulatedText', text);
        return;
      }

      Store.patch(
        'parser.accumulatedText',
        `${Store.parser().accumulatedText}\n${text}`
      );
    },

    handleText(text) {
      if (!CONFIG.parser.enabled) {
        Store.resetParserState();
        return;
      }

      if (!Store.parser().isCollecting) {
        return;
      }

      if (this.isInvalidLine(text)) {
        Logger.info('⏩ Пропущена ненужная строка парсера.');
        return;
      }

      this.updateAccumulatedText(text);
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

      Logger.debug('send', { command, options: finalOptions });

      if (finalOptions.trackParser && ParserModule.shouldStart(command)) {
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

    setHuntingQuest({ victims, loot }) {
      if (!Array.isArray(victims) || victims.length === 0) {
        return;
      }

      Store.update('hunting', hunting => {
        hunting.victims = victims.map(item => item.toLowerCase());
        hunting.victimIndex = 0;
        hunting.victim = hunting.victims[0];
        hunting.currentVictim = hunting.victim;
        hunting.lootItem = loot;
        hunting.cycleCount = 0;
        hunting.isControlCheck = false;
      });

      const hunting = Store.hunting();

      Logger.info(
        `>>> Русалочий квест распознан: цели = ${hunting.victims.join(', ')}, лут = ${hunting.lootItem}`
      );
    },

    getUserCommands() {
      return [
        {
          cmd: '/victim',
          handler: args => {
            const hunting = Store.hunting();
            const value = args
              .split(',')
              .map(item => item.trim().toLowerCase())
              .filter(Boolean);

            if (value.length === 0) {
              Logger.info(
                `>>> Текущие цели: ${hunting.victims.join(', ')}, лут: ${hunting.lootItem}\n`
              );
              return;
            }

            Store.update('hunting', hunting => {
              hunting.victims = value;
              hunting.victimIndex = 0;
              hunting.victim = value[0];
              hunting.currentVictim = value[0];
              hunting.cycleCount = 0;
              hunting.isControlCheck = false;
            });

            const nextHunting = Store.hunting();

            Logger.info(`>>> Цели охоты: ${nextHunting.victims.join(', ')}\n`);
          },
        },
        {
          cmd: '/weapon',
          handler: args => {
            const general = Store.general();
            const value = args.trim();

            if (!value) {
              Logger.info(`>>> Текущее оружие: ${general.weapon}\n`);
              return;
            }

            Store.patch('general.weapon', value);
            Logger.info(`>>> Твое оружие теперь ${Store.general().weapon}\n`);
          },
        },
        {
          cmd: '/iden',
          handler: args => {
            const value = args.trim();
            if (!value) {
              Logger.warn('>>> Укажи предмет: /iden <предмет>\n');
              return;
            }

            this.sendMany([
              `взять ${value} сумка`,
              `к опознание ${value}`,
              `полож ${value} сумка`,
            ]);
          },
        },
        {
          cmd: '/purge',
          handler: args => {
            const value = args.trim();
            if (!value) {
              Logger.warn('>>> Укажи предмет: /purge <предмет>\n');
              return;
            }

            this.sendMany([
              `взять ${value} сумка`,
              `бросить ${value}`,
              `жертвовать ${value}`,
            ]);
          },
        },
        {
          cmd: '/bd',
          handler: args => {
            const general = Store.general();
            const value = args.trim();

            if (!value) {
              Logger.info(
                `>>> Текущее направление для выбивания: ${general.doorToBash}\n`
              );
              return;
            }

            Store.patch('general.doorToBash', value);
            const nextGeneral = Store.general();
            Logger.info(
              `>>> Поехали, вышибаем по направлению ${nextGeneral.doorToBash}\n`
            );
            this.send(`выбить ${nextGeneral.doorToBash}`);
          },
        },
        {
          cmd: '/skill',
          handler: args => {
            const training = Store.training();
            const value = args.trim();

            if (!value) {
              Logger.info(`>>> Текущий навык: ${training.skillToTrain}\n`);
              return;
            }

            Store.patch('training.skillToTrain', value);
            Logger.info(
              `>>> Навык для тренировки: ${Store.training().skillToTrain}\n`
            );
          },
        },
        {
          cmd: '/skilldelay',
          handler: args => {
            const value = Number(args.trim());

            if (!Number.isFinite(value) || value < 300) {
              Logger.warn(
                '>>> Укажи задержку в мс, например: /skilldelay 4000\n'
              );
              return;
            }

            Store.patch('training.skillDelayMs', value);
            const training = Store.training();
            Logger.info(
              `>>> Задержка тренировки установлена: ${training.skillDelayMs} мс\n`
            );
          },
        },
      ];
    },

    processCommand(e, text) {
      const trimmedText = text.trim();
      const commandObj = this.getUserCommands().find(({ cmd }) =>
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

      Logger.warn('>>> Энергии не хватает, засыпаю...');

      TimerManager.clearMany([
        'training',
        'trainingUnlock',
        'energyRecovery',
        'energyWakeUp',
      ]);

      Store.patch('training.skillCount', 0);
      Store.setTrainingStatus('waiting_energy', 'недостаточно энергии');
      Store.patch('energy.isLow', true);
      Store.patch('general.isActionLocked', false);

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
            Store.patch('energy.isLow', false);
            return;
          }

          Store.setTrainingStatus('running', 'энергия восстановлена');
          Store.patch('energy.isLow', false);
          Store.patch('general.isActionLocked', false);
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
      Store.patch('training.skillCount', 0);
      Store.patch('energy.isLow', false);
      Store.patch('general.isActionLocked', false);

      Logger.info(
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
      Logger.info(`>>> Тренировка остановлена: ${reason}`);
    },

    scheduleTick(delay = null) {
      const energy = Store.energy();
      const training = Store.training();

      TimerManager.clear('training');

      if (!this.isRunning() || energy.isLow) {
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
      const energy = Store.energy();
      const general = Store.general();
      const training = Store.training();

      if (!this.isRunning() || energy.isLow || general.isActionLocked) {
        return;
      }

      if (training.skillCount >= training.maxSkillCount) {
        Commands.send(CONFIG.commands.clearBuffer);
        Logger.info(
          'Навык выполнен 98 раз. Очищаем буфер и выполняем команду "ум".'
        );
        Commands.send(CONFIG.commands.score);
        Store.patch('training.skillCount', 0);
        this.scheduleTick(training.skillDelayMs);
        return;
      }

      Store.patch('training.lastSkillUsedAt', Date.now());
      Commands.send(training.skillToTrain);
      Store.patch('training.skillCount', training.skillCount + 1);
      Logger.debug('Текущий счетчик навыка:', Store.training().skillCount);

      Store.patch('general.isActionLocked', true);
      TimerManager.set(
        'trainingUnlock',
        () => {
          const nextEnergy = Store.energy();
          const nextTraining = Store.training();

          Store.patch('general.isActionLocked', false);

          if (this.isRunning() && !nextEnergy.isLow) {
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

      Logger.debug('Обнаружено сообщение о достижении мастерства:', text);
      Commands.send(CONFIG.commands.clearBuffer);
      Logger.info('Мастерство достигнуто. Очищаем буфер.');
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

    escapeRegExp(str) {
      return String(str).replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
    },

    start() {
      const hunting = Store.hunting();

      Store.resetHuntingState('locating');
      Commands.where(hunting.victim);
      Logger.info('Отправлена команда "где victim".');
    },

    stopCombat(reason = 'без указания причины', nextStatus = 'stopped') {
      if (this.isFighting()) {
        Logger.info('>>> Бой остановлен:', reason);
      }

      Store.setHuntingStatus(nextStatus, reason);
      TimerManager.clear('attack');
    },

    switchToNextVictim(reason = 'не указана') {
      const hunting = Store.hunting();
      const nextIndex = hunting.victimIndex + 1;

      if (nextIndex >= hunting.victims.length) {
        Store.patch('hunting.cycleCount', hunting.cycleCount + 1);

        if (Store.hunting().cycleCount < CONFIG.hunting.maxCycles) {
          Store.update('hunting', hunting => {
            hunting.victimIndex = 0;
            hunting.victim = hunting.victims[0];
            hunting.currentVictim = hunting.victim;
          });

          Store.resetCurrentVictimProgress();
          Store.setHuntingStatus('locating', 'запуск контрольного круга');
          Store.patch('hunting.isControlCheck', true);

          Logger.warn(
            `>>> Первый проход по всем целям завершен. Запускаю контрольную перепроверку с начала. Причина: ${reason}`
          );

          const nextHunting = Store.hunting();
          Commands.where(nextHunting.victim);
          return true;
        }

        Logger.warn(
          `>>> Все цели проверены, включая контрольный круг. Охота остановлена. Причина: ${reason}`
        );
        Store.patch('hunting.isControlCheck', false);
        this.stopCombat('все цели проверены дважды', 'stopped');
        return false;
      }

      Store.update('hunting', hunting => {
        hunting.victimIndex = nextIndex;
        hunting.victim = hunting.victims[nextIndex];
        hunting.currentVictim = hunting.victim;
      });

      Store.resetCurrentVictimProgress();
      const nextHunting = Store.hunting();
      Store.setHuntingStatus(
        'locating',
        `следующая цель: ${nextHunting.victim}`
      );

      Logger.info(
        `>>> Переключаюсь на следующую цель: ${nextHunting.victim}. Причина: ${reason}${nextHunting.isControlCheck ? ' [контрольный круг]' : ''}`
      );
      Commands.where(nextHunting.victim);
      return true;
    },

    detectRusalkQuest(text) {
      const lowerText = text.toLowerCase();

      const matchedQuest = CONFIG.hunting.questTemplates.find(template =>
        template.match.every(fragment =>
          lowerText.includes(fragment.toLowerCase())
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

    getMatchedVictimFromText(text) {
      const lowerText = text.toLowerCase();
      return Store.hunting().victims.find(victim => lowerText.includes(victim));
    },

    findVictimLocation(text) {
      const hunting = Store.hunting();

      if (hunting.victimLocation) {
        return;
      }

      const victimName = hunting.victim.toLowerCase();
      const lowerText = text.toLowerCase();

      if (
        TEXT_PATTERNS.hunting.whereNotFound.test(text) &&
        lowerText.includes(victimName)
      ) {
        Logger.warn(`>>> Цель ${victimName} не найдена через "где".`);
        this.switchToNextVictim('where не нашел цель');
        return;
      }

      if (TEXT_PATTERNS.hunting.whereUnavailable.test(text)) {
        Logger.warn(`>>> Цель ${victimName} недоступна через "где".`);
        this.switchToNextVictim('where сообщил, что цель недоступна');
        return;
      }

      if (!lowerText.includes(victimName)) {
        return;
      }

      const parts = lowerText.split(victimName);
      if (parts.length <= 1) {
        Logger.warn('Не удалось найти местоположение.');
        return;
      }

      const rawLocation = parts[1].trim();
      const normalizedLocation = rawLocation.replaceAll(
        /^[\s.,:;!?-]+|[\s.,:;!?-]+$/g,
        ''
      );

      if (!normalizedLocation || normalizedLocation === '.') {
        Logger.warn(
          `>>> После имени цели не удалось извлечь корректную местность: "${rawLocation}"`
        );
        this.switchToNextVictim('не удалось распарсить местность');
        return;
      }

      Store.patch('hunting.victimLocation', normalizedLocation);
      const nextHunting = Store.hunting();
      Store.setHuntingStatus(
        'pathing',
        `местность: ${nextHunting.victimLocation}`
      );

      Logger.info('Местоположение жертвы:', nextHunting.victimLocation);
      Commands.path(nextHunting.victimLocation);
    },

    findLocationCode(text) {
      const hunting = Store.hunting();

      if (!hunting.victimLocation || hunting.locationCode) {
        return;
      }

      const lowerText = text.toLowerCase();
      const victimLocation = hunting.victimLocation.toLowerCase();

      if (lowerText.includes('ты уже здесь')) {
        return;
      }

      const safeVictimLocation = this.escapeRegExp(victimLocation);
      const pattern = new RegExp(
        String.raw`'${safeVictimLocation}(?:[.:;!?-]+)?'\s*:\s*(\S+)`,
        'i'
      );
      const match = text.match(pattern);
      const locationCode = match?.[1];

      if (!locationCode) {
        return;
      }

      Store.patch('hunting.locationCode', locationCode);
      const nextHunting = Store.hunting();
      Store.setHuntingStatus(
        'inspecting',
        `код пути: ${nextHunting.locationCode}`
      );
      Logger.info(`Код местности найден: ${nextHunting.locationCode}`);
      Commands.run(nextHunting.locationCode);

      Commands.send(CONFIG.commands.look);
    },

    inspectCurrentLocation(text) {
      const matchedVictim = this.getMatchedVictimFromText(text);

      if (!matchedVictim) {
        return;
      }

      Logger.info('>>> В локации жертвы, осматриваюсь.');
      this.handleVictimEncounter(text);
    },

    handleVictimEncounter(text) {
      const lowerText = text.toLowerCase();
      const matchedVictim = this.getMatchedVictimFromText(lowerText);

      if (!matchedVictim) {
        Logger.warn('>>> Ни одна из целей не найдена на текущей локации.');
        return;
      }

      if (
        lowerText.includes(matchedVictim) &&
        TEXT_PATTERNS.combat.corpseSuffix.test(text)
      ) {
        Logger.info(
          `>>> Жертва ${matchedVictim} уже мертва! Останавливаем охоту.`
        );
        Store.patch('hunting.currentVictim', matchedVictim);
        this.stopCombat('жертва уже мертва', 'stopped');
        Commands.send(CONFIG.commands.look);
        return;
      }

      Store.patch('hunting.currentVictim', matchedVictim);
      const hunting = Store.hunting();
      Logger.info(`>>> Жертва ${hunting.currentVictim} тут!`);

      if (lowerText.includes('сбегает')) {
        Logger.info('>>> Жертва пытается сбежать, продолжаем преследование...');
        Store.resetCurrentVictimProgress();
        Store.setHuntingStatus('locating', 'цель сбежала');
        Commands.where(hunting.currentVictim);
        return;
      }

      Logger.info(`>>> Атакую жертву: ${hunting.currentVictim}`);
      Store.setHuntingStatus(
        'fighting',
        `атака цели: ${hunting.currentVictim}`
      );

      TimerManager.clear('attack');
      this.continueAttacking();
    },

    continueAttacking() {
      const hunting = Store.hunting();

      TimerManager.clear('attack');

      if (!this.isFighting()) {
        Logger.debug(
          '>>> continueAttacking остановлен: hunting.status!=fighting'
        );
        return;
      }

      const target = hunting.currentVictim || hunting.victim;

      Logger.debug('>>> continueAttacking: отправляю атаку', target);
      Commands.send(`${hunting.attackCommand} ${target}`);

      TimerManager.set(
        'attack',
        () => {
          this.continueAttacking();
        },
        CONFIG.hunting.attackIntervalMs
      );
    },

    handleState(text) {
      const hunting = Store.hunting();
      const phaseHandlers = {
        locating: () => this.findVictimLocation(text),
        pathing: () => this.findLocationCode(text),
        inspecting: () => this.inspectCurrentLocation(text),
      };

      phaseHandlers[hunting.status]?.();
    },

    handleCombatState(text) {
      if (!this.isFighting()) {
        return;
      }

      const hunting = Store.hunting();
      const lowerText = text.toLowerCase();
      const victimName = (
        hunting.currentVictim || hunting.victim
      ).toLowerCase();

      if (
        lowerText.includes(victimName) &&
        TEXT_PATTERNS.combat.corpseSuffix.test(text)
      ) {
        Logger.info(`>>> Жертва ${victimName} мертва!`);
        Store.setHuntingStatus('looting', `лутание: ${hunting.lootItem}`);
        Commands.send(CONFIG.hunting.lootAllCommand(hunting.lootItem));
        this.stopCombat('жертва убита', 'looting');
        return;
      }

      if (TEXT_PATTERNS.combat.targetMissing.test(text)) {
        Logger.warn('>>> Текущая цель недоступна.');
        Logger.debug('>>> lowerText:', lowerText);

        this.stopCombat(
          'жертва недоступна',
          hunting.victims.length > 1 ? 'locating' : 'stopped'
        );

        if (
          Store.hunting().status === 'locating' &&
          hunting.victims.length > 1
        ) {
          this.switchToNextVictim('цель пропала или недоступна в бою');
        }

        return;
      }

      if (TEXT_PATTERNS.combat.cantFight.test(text)) {
        Logger.warn('>>> Вы не можете продолжать бой.');
        this.stopCombat('бой запрещен', 'stopped');
        return;
      }

      if (TEXT_PATTERNS.combat.death.test(text)) {
        Logger.warn('>>> Вы погибли.');
        this.stopCombat('персонаж погиб', 'stopped');
      }
    },
  };

  const BrewingModule = {
    isRunning() {
      return ['brewing', 'recovering'].includes(Store.brewing().status);
    },

    start() {
      Logger.info('>>> Начинаем варить зелье!');
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

      Logger.info('>>> Останавливаем варку зелий.');
      Store.resetBrewingState('stopped');
    },

    handleCommands(e, text) {
      const trimmedText = text.trim();

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
          Logger.info('>>> Повторяем поджиг зелья.');
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
          Logger.info('>>> Персонаж устал, начинаем восстановление.');
          Store.setBrewingStatus('recovering', 'усталость после варки');
          Commands.send(CONFIG.brewing.refreshSpell);
        },
      },
      {
        pattern: /^Усталость проходит... но лишь на мгновение.$/,
        action: () => {
          Logger.info('>>> Восстанавливаем энергию.');
          Commands.send(CONFIG.brewing.refreshSpell);
        },
      },
      {
        pattern: /^Усталость проходит, и ты готова к новым свершениям.$/,
        action: () => {
          const brewing = Store.brewing();
          Logger.info('>>> Полностью восстановились, продолжаем варку.');
          const shouldContinue = BrewingModule.isRunning();
          Commands.send(CONFIG.brewing.createInCauldron);
          Logger.debug('>>> brewing.status1:', brewing.status);
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
          Logger.info('>>> Зелье готово!');
          Logger.debug('>>> brewing.status2:', brewing.status);
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
          Logger.info('>>> Котел взорвался! начинаем сначало.');
          const shouldContinue = BrewingModule.isRunning();
          Commands.send(CONFIG.brewing.createInCauldron);
          Logger.debug('>>> brewing.status3:', brewing.status);
          if (shouldContinue) {
            BrewingModule.start();
          }
        },
      },
      {
        pattern: /ВЫБИЛ.? у тебя .*, и он.? пада.?т .*!/,
        action: () => {
          const general = Store.general();
          Logger.info('>>> Подбираю оружие с пола, очищаю буфер команд.');
          Commands.send(CONFIG.commands.clearBuffer);
          Commands.send(`взять ${general.weapon}|надеть ${general.weapon}`);
        },
      },
      {
        pattern: /Ты хочешь есть\./,
        action: () => {
          const general = Store.general();
          Logger.info('>>> Сейчас бы шашлычка...');
          Commands.send(`${CONFIG.commands.foodPrefix} ${general.foodItem}`);
        },
      },
      {
        pattern: /Ты хочешь пить\./,
        action: () => {
          Logger.info('>>> Сейчас бы вискарика...');
          Commands.send(CONFIG.commands.drink);
        },
      },
    ],

    playAlertSound() {
      if (!globalThis.speechSynthesis) {
        Logger.error('Браузер не поддерживает синтез речи.');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(CONFIG.alerts.speechText);
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

    handleTyphoenAlert(text) {
      if (!text.includes(CONFIG.alerts.typhoenText)) {
        return;
      }

      Logger.warn(
        '>>> Обнаружено упоминание Тайфоэна! Воспроизводим звуковой сигнал.'
      );
      this.playAlertSound();
    },

    runTextTriggers(text) {
      for (const { pattern, action } of this.triggers) {
        if (pattern.test(text)) {
          action();
          return true;
        }
      }

      return false;
    },

    handleGameStates(text) {
      HuntingModule.handleState(text);

      if (TrainingModule.isRunning() || TrainingModule.isWaitingEnergy()) {
        TrainingModule.handleState(text);
      }

      HuntingModule.handleCombatState(text);
    },

    handleIncomingText(e, text) {
      Logger.debug('Получен текст из инпута:', text);

      HuntingModule.detectRusalkQuest(text);
      this.handleTyphoenAlert(text);
      BrewingModule.handleCommands(e, text);
      ParserModule.handleText(text);
      this.handleGameStates(text);
      this.runTextTriggers(text);
    },
  };

  const UIBindings = {
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
        Logger.warn('Не удалось прочитать hotkey из localStorage', error);
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
      document.addEventListener(
        'click',
        () => {
          EventRouter.playAlertSound();
        },
        { once: true }
      );
    },

    bindRpcEvents() {
      $('#rpc-events').off('rpc-prompt.myNamespace');
      $('#rpc-events').on('rpc-prompt.myNamespace', (e, data) => {
        if (!DEBUG_MODE) {
          return;
        }

        Logger.debug('RAW rpc-prompt snapshot:', structuredClone(data));

        setTimeout(() => {
          Logger.debug(
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
        if (ParserModule.shouldStart(text)) {
          ParserModule.startCollection(text);
        }

        Commands.processCommand(e, text);
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

    bindKeydownEvents() {
      $('#input input').off('keydown.myNamespace');
      $('#input input').on('keydown.myNamespace', e => {
        Logger.debug(
          `Key pressed: e.code=${e.code}, e.key=${e.key}, e.keyCode=${e.keyCode}`
        );

        if (this.handleMovement(e)) {
          return;
        }

        switch (e.code) {
          case this.KeyCodes.Escape:
            if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
              $('#input input').val('');
            }
            e.preventDefault();
            break;
          case this.KeyCodes.Backquote:
            BuffModule.handleBuffs();
            e.preventDefault();
            break;
          case this.KeyCodes.Tab:
            e.preventDefault();
            this.handleTabActions();
            break;
          case this.KeyCodes.NumpadAdd:
            TrainingModule.start();
            e.preventDefault();
            break;
          case this.KeyCodes.NumpadSubtract:
            TrainingModule.stop('нажата клавиша минус');
            e.preventDefault();
            break;
          case this.KeyCodes.Home:
            Commands.sendMany(CONFIG.quickActions.healPotion);
            e.preventDefault();
            break;
          case this.KeyCodes.End:
            Commands.sendMany(CONFIG.quickActions.healCast);
            e.preventDefault();
            break;
          case this.KeyCodes.NumpadMultiply:
            HuntingModule.start();
            e.preventDefault();
            break;
          default:
            return;
        }

        e.preventDefault();
      });
    },

    init() {
      this.bindDocumentEvents();
      this.bindRpcEvents();
      this.bindTextEvents();
      this.bindInputEvents();
      this.bindKeydownEvents();
    },
  };

  UIBindings.init();
})();
