<?php

namespace controller\channel;

class get_data_init {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        $id=\acp\requestSendI1List(ACP_CMD_CHANNEL_GET_DATA_INIT, $p['item']);
        $data = \acp\getRegsmpDataInit($id);
        \sock\suspend();
        return $data;
    }

}
