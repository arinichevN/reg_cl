<?php

namespace controller\reg;

class set_cooler_mode {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\sendPackI1S1(ACP_CMD_REGSMP_PROG_SET_COOLER_MODE, $p['item']);
        \sock\suspend();
    }

}
