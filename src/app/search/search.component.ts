import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../service/http.service';
import {API} from '../api/api';
import {EchartsNg2Component} from 'echarts-ng2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit{
  ngAfterViewInit(): void {
    this.search();
  }

  word:string = 'hello';
  similarWordList: string[];
  wordTranslation: WordTranslate = {word: '', means: [], examples: []};
  wordInfo: WordInfo = { count: 0};
  @ViewChild('echarts') echartsDiv: EchartsNg2Component;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  /**
   * 搜索
   */

  search(word?: string){
    console.log('search', this.word);
    if(word){
      this.word = word;
    }
    this.httpService.getJson(API.translate, {word: this.word}).subscribe(
      resp=>{
        if(resp['code'] != 1000){
          console.error(`error: ${resp['msg']}`);
          return;
        }
        let data = resp['data'];
        let means:Mean[] = [];
        for(let explain of data['basic']['explains']){
          let split = explain.split('.');
          let mean: Mean = {wordType: split[0], mean: split[1]};
          means.push(mean)
        }
        this.wordTranslation= {
          word: data['query'],
          means: means,
          examples: []
        };
        console.log(this.wordTranslation)
      }
    );
    this.similarWordList = [];

    this.initWordGraph();

    this.httpService.getJson(API.similar, {word: this.word}).subscribe(
      resp=>{
        if(resp['code'] != 1000){
          console.error(`error: ${resp['msg']}`);
          return;
        }
        let data = resp['data'];
        this.similarWordList = [];
        for(let word3simi of data){
          this.similarWordList.push(word3simi);
        }

        this.gennerateWordGraph(data);
      }
    );

    this.httpService.getJson(API.info, {word: this.word}).subscribe(
      resp=>{
        if(resp['code'] != 1000){
          console.error(`error: ${resp['msg']}`);
          return;
        }
        this.wordInfo.count = resp['data']['count'];
        this.wordInfo.frequency = `${(Math.random() * 10).toString().substr(0, 4)}%`
      }
    );

  }

  initWordGraph(){
    this.option.series[0]['data'] = [{  // 把要搜索的单词放进去
      "name": this.word,
      "symbolSize": 12,
      "draggable": "true",

    }];
    this.option.series[0]['links'] = [];  // 无连接线
    this.option.series[0]['categories'] = [{
      'name': this.word
    }];
    console.log(this.option);
    this.echartsDiv.setOption(this.option);
  }

  gennerateWordGraph(data){
    for(let word3simil of data){
      this.option.series[0]['data'].push({  // 生成点
        "name": word3simil[0],
        "symbolSize": 12,
        "draggable": "true",
        'itemStyle':{
          'color': 'auto'
        }
      });

      this.option.series[0]['links'].push({  // 连成线
        "source": this.word,
        "target": word3simil[0]
      });

      this.option.series[0]['categories'].push({
        'name': word3simil[0]
      })
    }
    console.log(this.option);
    this.echartsDiv.setOption(this.option);
  }
  /**
   * 词过滤
   */
  wordFilter(){

  }

  option = {

    animationDuration: 3000,
    animationEasingUpdate: 'cubicOut',
    series: [{
      name: '单词图谱',
      type: 'graph',
      layout: 'force',

      force: {
        repulsion: 60,
        'gravity': 0.05
      },
      data: [
        ],
      links: [
         ],
      edgeLabel:{
        show: false
      },
      categories: [],
      focusNodeAdjacency: true,
      roam: true,
      label: {
        normal: {
          show: true,
          position: 'top',

        }
      },
      lineStyle: {
        normal: {
          color: 'source',
          curveness: 0,
          type: "solid"
        }
      }
    }]
  };
}
interface WordInfo{
  count?: number;
  frequency?: string;
  wrroy?: string;
}
interface WordTranslate{
  word?: string;
  means?: Mean[];
  examples?: string[];
}

interface Mean{
  wordType: string;
  mean: string;
}

enum WordType{
  n,
  adj,
  v,
  art,
  conj,
  pron,
  adv,
  num,
  prep,
  int
}
