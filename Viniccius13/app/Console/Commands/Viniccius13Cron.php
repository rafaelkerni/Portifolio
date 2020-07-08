<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Youtube;
use Twitter;
use DB;

class Viniccius13Cron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'viniccius13:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        date_default_timezone_set('America/Sao_Paulo');
        
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
            if((date('H') >= 13) and ($data_ult_tweet < $hoje )) {
				$this->info('entrou');
                //Twitto
                $tweet = Twitter::postTweet(['status' => 'NÃO', 'format' => 'json']);
                $tweet = json_decode($tweet);
                
                //Salvo no banco as infos do tweet
                DB::table('configs')->update(['data_ult_tweet' => date('Y-m-d H:i'), 'id_ult_tweet' => $tweet->id_str]);
            }
        }
		//$this->info($data_ult_tweet);
    }
}
