<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Youtube;
use Twitter;
use DB;
use Storage;

class Viniccius13Controller extends Controller
{
    public function index21321312(){
        date_default_timezone_set('America/Sao_Paulo');
        dd(1);
        //pego a playslist do canal
        $playlistItems = Youtube::getPlaylistItemsByPlaylistId('UUiIZY89KwQkxAW-4Le7U7zg');
        $ultVideo =  $playlistItems['results'][0]->snippet;

        //pego a data de publicação do ultimo video
        $date = $ultVideo->publishedAt;
        $ultimadata = date_create($date)->format('d/m/Y');

        //pego a data nas configurações do banco
        $db = DB::table('configs')->first();
        $data_ult_tweet = date_create($db->data_ult_tweet)->format('d/m/Y');

        //se a data do ultimo video for hoje
        if($ultimadata == date('d/m/Y')){
           //Postou video novo \o/

            //Se já postei hoje que não teve video removo o tweet
            if($data_ult_tweet == date('d/m/Y')){
                try{
                    Twitter::destroyTweet($db->id_ult_tweet);
                }catch(\Exception $e){
                }
            }

            //Pego ao thumbnail do video e upo para o twitter
            $url_thumbnail = $ultVideo->thumbnails->standard->url;
            $thumbnail = file_get_contents($url_thumbnail);
            $upload = Twitter::uploadMedia(['media' => $thumbnail]);

            //pego as infos do video para incluir no tweet
            $id_video = $ultVideo->resourceId->videoId;
            $nome_video = $ultVideo->title;

            //Twitto
            $tweet = Twitter::postTweet(['status' => 'SIM'."\xA".$nome_video."\xA".'https://www.youtube.com/watch?v='.$id_video, 'media_ids' => $upload->media_id_string, 'format' => 'json']);
            $tweet = json_decode($tweet);

            //Salvo no banco as infos do tweet
            DB::table('configs')->update(['data_ult_video' => $ultimadata ,'data_ult_tweet' => date('Y-m-d H:i'), 'id_ult_tweet' => $tweet->id_str]);
        } else{
            //Não postou video :(

            //posta tweet apenas depois das 13h e que não tenha sido postada hoje ainda
            if((date('H') >= 13) and ($data_ult_tweet < date('d/m/Y') )) {
                //Twitto
                $tweet = Twitter::postTweet(['status' => 'NÃO', 'format' => 'json']);
                $tweet = json_decode($tweet);

                //Salvo no banco as infos do tweet
                DB::table('configs')->update(['data_ult_tweet' => date('Y-m-d H:i'), 'id_ult_tweet' => $tweet->id_str]);
            }
        }
    }

    public function index(){
      date_default_timezone_set('America/Sao_Paulo');
        $txtUltTweet = Twitter::getTweet('1121953000287866881')->text;
        if (strpos($txtUltTweet, 'SIM') === false) {
            dd(1);
        }
        dd(2);

        //pego a playslist do canal
        $playlistItems = Youtube::getPlaylistItemsByPlaylistId('UUiIZY89KwQkxAW-4Le7U7zg');
        $ultVideo =  $playlistItems['results'][0]->snippet;

        //pego a data de publicação do ultimo video
        $date = $ultVideo->publishedAt;
        $ultimadata = date_create($date)->format('Y-m-d');

        //pego a data nas configurações do banco
        $db = DB::table('configs')->first();
		if($db->data_ult_tweet != ''){
			$data_ult_tweet = date_create($db->data_ult_tweet)->format('Y-m-d');
		}else{
			$data_ult_tweet = '0';
		}

		$hoje = date('Y-m-d');

        //se a data do ultimo video for hoje
        if($ultimadata == $hoje){
           //Postou video novo \o/

            //Se já postei hoje que não teve video removo o tweet
            if($data_ult_tweet == $hoje){
                try{
                   $this->info('destroy');
                    //Twitter::destroyTweet($db->id_ult_tweet);
                }catch(\Exception $e){
                }
            }

            //Pego ao thumbnail do video e upo para o twitter
            $url_thumbnail = $ultVideo->thumbnails->standard->url;
            $thumbnail = file_get_contents($url_thumbnail);
            $upload = Twitter::uploadMedia(['media' => $thumbnail]);

            //pego as infos do video para incluir no tweet
            $id_video = $ultVideo->resourceId->videoId;
            $nome_video = $ultVideo->title;
            $this->info($nome_video);

            //Twitto
            //$tweet = Twitter::postTweet(['status' => 'SIM'."\xA".$nome_video."\xA".'https://www.youtube.com/watch?v='.$id_video, 'media_ids' => $upload->media_id_string, 'format' => 'json']);
            //$tweet = json_decode($tweet);

            //Salvo no banco as infos do tweet
            DB::table('configs')->update(['data_ult_video' => $ultimadata ,'data_ult_tweet' => date('Y-m-d H:i'), 'id_ult_tweet' => $tweet->id_str]);
        } else{
            //Não postou video :(

            //posta tweet apenas depois das 13h e que não tenha sido postada hoje ainda
            if((date('H') >= 13) and ($data_ult_tweet < $hoje )) {
				         $this->info('entrou');
                //Twitto
                //$tweet = Twitter::postTweet(['status' => 'NÃO', 'format' => 'json']);
                //$tweet = json_decode($tweet);

                //Salvo no banco as infos do tweet
                //DB::table('configs')->update(['data_ult_tweet' => date('Y-m-d H:i'), 'id_ult_tweet' => $tweet->id_str]);
            }
        }
		//$this->info($data_ult_tweet);
    }
}
