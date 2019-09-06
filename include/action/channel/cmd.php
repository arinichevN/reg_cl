<?php

$af = function($p) {
	$sock = \acpp\connect($p['address'], $p['port'], 3);
	\acpp\requestSendI1List($sock, $p['cmd'], $p['item']]);
	\acpp\suspend($sock);
};
