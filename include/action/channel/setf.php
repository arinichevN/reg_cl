<?php

$af = function($p) {
	$sock = \acpp\connect($p['address'], $p['port'], 3);
	\acpp\requestSendI1F1List($sock, $p['cmd'], $p['item']);
	//\acpp\requestSend($sock,$p['cmd'], NULL, NULL);
	\acpp\suspend($sock);
};
