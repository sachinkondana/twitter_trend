<?php
session_start();
require_once("twitteroauth/twitteroauth.php"); //Path to twitteroauth library
 
$twitteruser = "codecraftdemo";
$notweets = 30;
$consumerkey = "N7nZWflsPTatcrGmbBNEHYEaa";
$consumersecret = "23XLL1dSWKHt09QMimdNLc9OWew3R9OcCFi6XEnku7z1XdEDou";
$accesstoken = "179851506-efkZeOx2DNdXIubbgQHIf7VXqjA6Y7a2ACsc7egl";
$accesstokensecret = "FHoyzh45VKBmZgJ02mMmnOseJ9GzNuo1NO7sWcTDI51sy";
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);

// $tweets = $connection->get("https://api.twitter.com/1.1/geo/search.json?query=India");
// $tweets = $connection->get("https://api.twitter.com/1.1/geo/id/b850c1bfd38f30e0.json");
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/home_timeline.json");

echo json_encode($tweets);
?>