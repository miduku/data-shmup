<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Get config file **/
$config = json_decode(file_get_contents(__DIR__.'/config/twitter-oauth.json'), true);

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => $config['OAUTH_ACCESS_TOKEN'],
    'oauth_access_token_secret' => $config['OAUTH_ACCESS_TOKEN_SECRET'],
    'consumer_key' => $config['CONSUMER_KEY'],
    'consumer_secret' => $config['CONSUMER_SECRET']
);

/** Post data from ajax call **/
$q      = $_POST['q'];
$count  = $_POST['count'];
$until  = $_POST['until'];


/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
$url = 'https://api.twitter.com/1.1/search/tweets.json';
$requestMethod = 'GET';

$getfield =  '?q=' . $q;
$getfield .= '&count=' . $count;
$getfield .= '&until=' . $until;

$twitter = new TwitterAPIExchange($settings);
$response = $twitter->setGetfield($getfield)
                    ->buildOauth($url, $requestMethod)
                    ->performRequest();


echo $response;