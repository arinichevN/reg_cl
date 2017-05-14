<?php

namespace controller\reg;

class set_heater_ki {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\sendPackI1F1(ACP_CMD_REGSMP_PROG_SET_HEATER_KI, $p['item']);
        \sock\suspend();
    }

}
