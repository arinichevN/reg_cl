trans.addDict([
    {id: 300, str: ["on/off","вкл/выкл"]},
    {id: 301, str: ["prog. on/off","прог. вкл/выкл"]},
    {id: 302, str: ["busy time","время работы"]},
    {id: 303, str: ["executive mechanism","исполнительный механизм"]},
    {id: 304, str: ["program","программа"]},
    {id: 305, str: ["on", "вкл"]},
    {id: 306, str: ["off","выкл"]},
    {id: 307, str: ["update","обновить"]},
    {id: 308, str: ["controller state","состояние контроллера"]},
    {id: 309, str: ["reset","сброс"]},
    {id: 310, str: ["unload","выгрузить"]},
    {id: 311, str: ["reset","сброс"]},
    {id: 312, str: ["edit","редактировать"]},
    {id: 313, str: ["controller time: ","время контроллера: "]},
    {id: 314, str: ["regulator","регулятор"]},
    {id: 315, str: ["heater","нагреватель"]},
    {id: 316, str: ["cooler","охладитель"]},
    {id: 317, str: ["start","старт"]},
    {id: 318, str: ["goal","цель"]},
    {id: 319, str: ["hysteresis","гистерезис"]},
    {id: 320, str: ["EM change gap","время переключения ИМ"]},
    {id: 323, str: ["regulator","регулятор"]},
    {id: 324, str: ["get settings","получить настройки"]},
    {id: 325, str: ["power","мощность"]},
    {id: 326, str: ["set power","установить мощность"]},
    {id: 327, str: ["switch state","переключить состояние"]},
    {id: 328, str: ["control method","метод регулирования"]},
    {id: 329, str: ["use","использовать"]},
    {id: 330, str: ["turn on","вкл."]},
    {id: 331, str: ["turn off","выкл."]},
    {id: 332, str: ["turn controller on/off","вкл./выкл. регулятор"]},
    {id: 333, str: ["controller kind","тип регулятора"]},
    {id: 334, str: ["output","задание для исполнительного механизма"]},
	{id: 335, str: ["hysteresis","гистерезис"]},
	{id: 336, str: ["kp","коэффициент пропорциональности"]},
	{id: 337, str: ["ki","интегральный коэффициент"]},
	{id: 338, str: ["kd","дифференциальный коэффициент"]},
	{id: 339, str: ["save selected parameters for all channels","сохранить выбранные параметры для выбранных каналов"]},
	{id: 340, str: ["period, ms","период, мс"]},
	{id: 341, str: ["resolution","разрешение"]},
	{id: 342, str: ["turn alarm control on/off","вкл./выкл. контроль тревог"]},
	{id: 343, str: ["period, ms","период, мс"]},
	{id: 344, str: ["",""]},
	{id: 345, str: ["master request timeout, ms","время ожидания запроса от ведущего, мс"]},
	{id: 346, str: ["period", "период"]},
	{id: 347, str: ["PWM", "ШИМ"]},
	{id: 348, str: ["alarm", "тревога"]},
	{id: 349, str: ["hysteresis", "гистерезис"]},
	{id: 350, str: ["first alarm block timer, ms","таймер блокировки первого срабатывания, с"]},
	{id: 351, str: ["get","получить"]},
	{id: 352, str: ["resolution","разрешение"]},
	{id: 353, str: ["2pos","2поз"]},
	{id: 354, str: ["PID","ПИД"]},
	{id: 355, str: ["output while ON state","задание для исполнительного механизма во включенном состоянии"]},
	{id: 356, str: ["output while OFF state","задание для исполнительного механизма в выключенном состоянии"]},
	{id: 357, str: ["security","безопасность"]},
	{id: 358, str: ["update","обновлять"]},
	{id: 359, str: ["1pos","1поз"]},
	{id: 360, str: ["regulator block state","состояние блока регулятора"]},
	{id: 361, str: ["alarm block state","состояние блока тревог"]},
	{id: 362, str: ["security block state","состояние блока безопасности"]},
	{id: 363, str: ["output","выход"]},
	{id: 364, str: ["get selected parameters for selected channel","получить выбранные параметры для выбранного канала"]},
    {id: 365, str: ["minimum high level duration, ms","минимальная продолжительность высокого уровня, мс"]},
    {id: 366, str: ["maximum high level duration, ms","максимальная продолжительность высокого уровня, мс"]},
    {id: 367, str: ["measure unit","единица измерения"]},
    {id: 368, str: ["value being controlled","регулируемая величина"]},
	
]);
//menu
trans.addDict([
    {id: 400, str: ["regulator", "регулятор"]},
    {id: 401, str: ["climate control", "управление климатом"]},
    {id: 402, str: ["help", "помощь"]},
    {id: 403, str: ["settings", "настройки"]},
    {id: 404, str: ["on/off factors", "вкл/выкл коэффициенты"]},
    {id: 405, str: ["edit", "редактировать"]},
    {id: 406, str: ["program", "программа"]},
    {id: 407, str: ["PID factors", "ПИД коэффициенты"]}
]);

//error
trans.addDict([
    {id: 250, str: ["failed to get data from database", "не удалось получить данные из базы данных"]},
    {id: 251, str: ["failed to send command to controller", "не удалось отправить команду контроллеру"]},
    {id: 252, str: ["controller is active", "контроллер активен"]},
    {id: 253, str: ["controller is at standby mode and not ready for valve control", "контроллер находится в режиме ожидания и не готов управлять клапанами"]},
    {id: 254, str: ["failed to get response from controller", "не удалось получить ответ от контроллера"]},
    {id: 255, str: ["unknown response from controller", "неизвестный ответ от контроллера"]},
    {id: 256, str: ["broken connection with one of modules", "нет связи с одним из модулей"]},
    {id: 257, str: ["failed to save", "не удалось сохранить"]},
    {id: 258, str: ["failed to get program name", "не удалось узнать имя программы"]},
    {id: 259, str: ["failed to set goal for regsmp", "не удалось сохранить цель для регулятора"]},
    {id: 260, str: ["failed to set delta for regsmp", "не удалось сохранить дельту для регулятора"]},
    {id: 261, str: ["failed to set goal for alr", "не удалось сохранить цель для проверщика"]},
    {id: 262, str: ["failed to set delta for alr", "не удалось сохранить дельту для проверщика"]},
    {id: 263, str: ["failed to enable regsmp prog", "не удалось активировать программу для регулятора"]},
    {id: 264, str: ["failed to disable regsmp prog", "не удалось деактивировать программу для регулятора"]},
    {id: 265, str: ["failed to enable lgr prog", "не удалось активировать программу для регистратора"]},
    {id: 266, str: ["failed to disable lgr prog", "не удалось деактивировать программу для регистратора"]},
    {id: 267, str: ["failed to set sms", "не удалось установить СМС"]},
    {id: 268, str: ["failed to set ring", "не удалось установить дозвон"]},
    {id: 269, str: ["data shift", "сдвиг данных"]},
    {id: 270, str: ["failed to set parameter for regsmp", "не удалось сохранить параметр для регулятора"]}
]);




