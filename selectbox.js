/**
 * <selectbox>
 * 
 * @author : Jo Yun Ki (wddo@hanatour.com)
 * @version : 1.7.0
 * @since : 2013.11.12
 *
 * @classdesc
 * 
 * <strong>History</strong>
 *
 * <pre class="prettyprint">
 * 1.4   (2013.12.08) : -
 * 1.4.1 (2013.12.16) : $hiddenSelect.val(selectValue) 로 변경을 알리기 때문에 option 태그에 value 값이 동일하면 정상적으로 변경되지 않는 부분 수정
 * 1.4.2 (2014.01.22) : 리스트 a 태그 title 속성 추가
 * 1.4.3 (2014.07.16) : multiText 옵션 생성하여 리스트의 텍스트의 구분자를 지정하면 span 태그로 분할 래핑
 *                      changeText() 의 html 인자 추가
 *                      disabledClass 옵션 추가 컨테이너 DIV에 class 적용됩니다.
 *                      zindex 옵션 존재 시 z-index 리스트 열고 닫을 때 변경
 *                      option 태그에 class 속성이 존재 할 경우 위에서 multiText에 의해 나누어진 span 에 차례대로 클래스가 이전된다. 단, span 당 하나의 클래스
 * 1.4.4 (2014.08.14) : 리스트 전체 가로 크기보다 텍스트가 긴 리스트를 선택시 btn 에 영역을 넘어가 버린다 그래서
 *                      css 에서 btnA>span 에 overflow:hidden 을 처리하면 오른쪽이 여유가 없어 btnA>span width 에 5px 를 빼주었다.
 *                      버튼 클릭 시 selectList() 함수 비 실행으로 수정하여 select 태그 change event 발생하지 않게 수정
 * 1.4.5 (2014.08.18) : opts.width 가 btnA에 width 였는데 따로 옵션으로 설정해줄 필요가 없어보여 container의 width 로 변경 하였다.
 * 1.4.6 (2014.09.01) : 완료 시점에 hidden select tag 를 통하여 complete.selectbox 이벤트 발생
 * 1.4.7 (2014.09.11) : 외부에서 메소드로 리스트 변경 시 maskDIV의 display:none으로 인하여 position().top 을 0으로 반환 직접 index로 계산으로 인한 itemHeight 변수 추가
 * 1.4.8 (2014.09.12) : getBorderWidth() 메소드 추가하여 ul 뿐만 아니라 tweenDIV 의 좌우 border로 list의 width 값에 영향을 주게 변경
 *                      btnA의 글자라인이 늘어나면 btnHeight 재정의하여 maskDIV top 위치 조정
 *                      1.4.4 에 삭제된 버튼클릭 시 selectList() 호출 삭제로 인하여 버튼 클릭시 리스트 활성화 안되던것 복구
 * 1.4.9 (2014.09.19) : getBorderHeight() 메소드 추가하여 tweenDIV, maskDIV 에 대한 높이 재정리
 * 1.5   (2014.10.14) : ul 에 paddingTop, paddingBottom 을 적용하여 상하 여백을 만드는 상황을 대비하여 $maskDIV 의 height 값에 더해주었다.
 * 1.5.1 (2015.04.23) : opts.complete 와 $.SelectBoxSet() 의 3번째 인자 전체 complete 추가
 * 1.5.2 (2015.06.18) : 최초 생성시 hidden select onchange 발생 않게 수정
 * 1.5.3 (2015.07.02) : $hiddenSelect의 부모 div중 display: none 이면 높이 0 처리 되므로 보여줬다 .unhide_wddo를 이용하여 다시 숨김
 * 1.5.4 (2015.08.10) : mousewheel 작동 시 이동 거리 itemHeight 1개 크기로 jScrollPane에 지정
 * 1.5.5 (2016.01.29) : $hiddenSelect 에 대하여 trigger 시 'change.selectbox' 에서 'change' 로 변경으로 사용성 높임
 * 1.5.6 (2016.02.12) : option 태그에 대한 disabled 속성 대응, opts.chooseClass 추가, 'keydown.selectbox' 이벤트에서 disabled(li display:none) 대응하도록 수정
 * 1.5.7 (2016.04.04) : data-zindex 존재시 열릴 때 opts.zindex 대신 사용, isDisabled 미리 설정 되지 않고 setDisabled() 함수 안에서만 설정되도록 수정 
 * 1.5.8 (2016.04.04) : css에서 리스트 ul 에 대하여 height 지정 시 스크롤바 생성 상황에서 높이를 css 크기 만큼만 받아와 스크롤 레이아웃 깨지므로 height: 100% 지정
 *                      $.SelectBoxSet 에 isHidden 추가하여 보이는 것만 적용 할지 유무를 정하도록 수정
 * 1.5.9 (2016.07.20) : opts.autoListWidth 추가, 적용 시 9. 번 설명 에서의 .maskDiv_wddo를 padding-right 나 margin-right로 조절 불가
 *                      리스트 선택 시 changeText, changeValue, changeScroll, changeChoose 두번씩 호출되는 문제 해결
 *                      setIndex() 에서 li.disabled 체크하여 선택 안되도록 수정, 아이템 숨기는 'disabled' 클래스명 옵션 조절 가능하도록 opts.disabledItemClass 추가
 * 1.6   (2016.07.27) : 키워드 검색 기능 추가 (jquery ui selectmenu 참조함)
 * 1.6.1 (2016.07.28) : ... 줄임에 대한 툴팁 기능 추가
 * 1.6.2 (2017.03.09) : setReset()시 인자로 $hiddenSelect 에대하여 change 이벤트 발생 유무를 지정할 수 있도록 함
 * 1.6.3 (2017.06.12) : dispose() 시 option 태그에 대한 prop('selected') 삭제, setReset() 시 기존 seleced 유지 안되도록
 *                      selectbox 가로크기 자동조정 기능 추가로 opts.width : 'auto' 를 대응하기 위해 changeBtnWidth() 함수 생성하고 기존 btnA > span 크기 조정 로직 포함시킴
 * 1.6.4 (2017.06.15) : 첫번째 리스트를 제외한 disabled 리스트는 숨기지 않고 비활성화 시킴, 키보드 pageup, pagedown 기능 확장(미오픈시 3칸, 스크롤시 보이는갯수 만큼 이동)
 *                      검색 시 String.fromCharCode() 에서 키패드 숫자가 a~j 로 반환 되는 문제해결을 위해 keyCode -48, alt키 이용한 오픈방식 toggle 형태로 변경 
 *                      opts.disabledClass 기본값 지정 'selDisabled'
 * 1.6.5 (2017.07.26) : 강제로 적용되던 width 정리하고 autoListWidth에 따른 btnA보다 작은 리스트일때만 width 강제 되도록 수정, opts.autoListWidth 기본값 true로 변경
 * 1.6.6 (2017.07.31) : 생성하면 인라인 option[selected] 속성 사라지도록 수정, 이후 컨트롤은 prop('selected')로 하며 dispose(), setReset()시 option[selected] 속성이 없으면 0 초기화
 *                      opts.initClass 추가
 * 1.6.7 (2017.11.20) : comp() 발생전에 빠르게 여러 셀렉트박스를 클릭하면 동시에 열리는 문제 해결
 * 1.6.8 (2017.12.11) : tooltip y위치 잡는 기준인 $container 높이가 $btnA 보다 작은 경우가 있어 Math.max로 체크, toggleTooltip() 에 isOver 정의 시 정확도 향상
 *                      $container 가 float === left 이면 tooltip after시 기준점이 $container 좌측상단 이기 때문에 높이조절 하지 않아도됨
 * 1.6.9 (2017.12.28) : 닫혀 있을 때 enter 입력 시 열리는 기능 추가
 * 1.7.0 (2018.05.17) : 리스트 마우스 드래깅 기능 추가 (참조 : https://github.com/davetayls/jquery.kinetic), opts.tooltip 추가
 * </pre>
 *
 * <strong>Note</strong>
 *
 * <pre class="prettyprint">
 * 1.  디자인 셀렉트 박스 (div >> a, div >> ul 구조), (select 태그 기반)
 * 2.  $.SelectBoxSet 를 실행하면 내부적으로 document ready 후 실행한다.
 * 3.  select 태그에 onchange 이벤트가 발생하면 디자인 셀렉트 박스에 전달된다. $hiddenSelect.bind('change.selectbox', function (e) {}); 의해 전달
 *     단 select 태그의 selectIndex나 value 변경 시 onchange 발생 안하므로 select.change() 이벤트 발생시켜 줘야 함
 * 4.  select 의 속성 변화(disabled, selected)는 select 태그에 적용후 .setReset() 를 실행
 * 5.  select 태그가 없는 디자인 셀렉트 박스는 $('target').on('change.selectbox', function (e, param) {} 로 반환값을 전달 받는다.
 * 6.  select 태그 기반으로 작성 시 반드시 option 태그에 value 속성 존재하여야 한다. 디자인 셀렉트 에선 li 에 data('value') 로 저장된다.
 * 7.  지정 높이가 리스트보다 작으면 자동 스크롤바 생성(참조 : <a href="http://jscrollpane.kelvinluck.com">http://jscrollpane.kelvinluck.com</a>)
 * 8.  1.4 버전 이후 IE6 지원하지 않음 
 * 9. 리스트의 가로 사이즈를 변경하고자 한다면 css .maskDiv_wddo 의 padding-right 나 margin-right 로 조절한다.
 * 10. 스크롤의 여백 조절은 좌.우 는 css .jspVerticalBar 의 left:0; padding-left, right:0; padding-right를 조절하며 상단 하단 여백 높이는 css .jspCapTop .jspCapBottom 의 height 로 조절
 * 11. 리스트를 2줄이상으로 보이게 하려면 css white-space: nowrap; 삭제
 * 12. 리스트의 상하 여백은 padding-top, padding-bottom 으로 조절한다.
 * 13. 완료 이벤트 받는 방법은 3가지 존재한다.
 *         $('select').on('complete.selectbox', function () {}); select 태그의 이벤트를 이용
 *         opts.complete 옵션을 이용
 *         $.SelectBoxSet = function (_target, _options, _complete, _hidden) _compelte 인자를 이용(전체 완료 시), _hidden 인자로 보여지는 것만 적용할지 선택 가능
 *         사용하지 않는 getTab() 함수 삭제
 * 14. selectbox 가로크기 결정 요소는 opts.width, 미지정 시 select 태그 부모 가로크기이며 opts.width : 'auto' 시 값에 따라 유동적으로 변함, 아마것도 없으면 가장 긴 리스트 크기($container.width())
 * 15. 생성 시 option[selected] 속성으로 초기 활성화를 정하며, 이후 컨트롤은 prop('selected')로 하며 setReset() 시 option[selected] 속성이 없으면 기본 0초기화
 *     select태그의 selectedIndex 속성은 참조 안함 (생성 후 select 된 option index 가 select태그의 selectedIndex 속성, 즉 prop('selected')와 같기 때문에 init() 시 참조 안함)
 * </pre>
 * 
 * <strong>Initialize</strong>
 *
 * <pre class="prettyprint">
 * //일괄 적용
 * $.SelectBoxSet('select#id', options, onComplete, isHidden);
 * 
 * //특정 셀렉트박스 적용
 * var selectBox = new Hanatour.components.selectbox('select#id', options); 
 * selectBox.init();
 * </pre>
 * 
 * @tutorial [Demo]{@tutorial Hanatour.components.selectbox}
 * @module Hanatour/components/selectbox
 */
define(['libs/jquery.jscrollpane.min', 'libs/jquery.mousewheel'], function () {
    'use strict';
    var $ = Hanatour.jquery || jQuery;

    /**
     * select 태그 기반 이벤트 리스너
     * 
     * @example
     * $('#select').change(function (e) {      //런타임 생성된 셀렉트 박스는 $(div.container).on('change', '#select', function (e) { 로 처리
     *     console.log(e.target.selectedIndex);
     *     console.log(e.target.value);
     * });
     * 
     * //변경 방법 예시 (value 와 index 방법 중 택1)
     * $('#select').val('value2');             // Vanilla JS : document.getElementById('#select').value = "value2";
     * $('#select').prop('selectedIndex', 3);  // Vanilla JS : document.getElementById('#select').selectedIndex = 3;
     *
     * $('#select').change();                  // 값 변경 후 change() 호출하여 디자인 셀랙트박스에 값 반영
     * 
     * @event module:Hanatour/components/selectbox~change
     */
    
    /**
     * div class="select" 기반 이벤트 리스너
     * 
     * @example
     * $(div.select').on('change.selectbox', function (e, param) {
     *     console.log('change index: ' + param.index);
     *     console.log('change value: ' + param.value);
     *     console.log('change text: ' + param.text);
     * });
     * 
     * @event module:Hanatour/components/selectbox~change'selectbox
     * @param {Event} e - change 이벤트 겍체
     * @param {Object} param - select 정보
     * @property param
     * @property {Number}       param.index     - index 값
     * @property {String}       param.value     - value 값
     * @property {String}       param.text      - text 값
     */

    /**
     * div.select 디자인 완료 시점 컨트롤 방법 ( 디자인 셀렉트박스가 생성 되기 이전에 정의 후 활용 )
     * 
     * @example
     * $('#select').on('complete.selectbox', function () {
     *     var selectBox = $(this).prev('div.select').getInstance();
     *     if (selectBox !== undefined) selectBox.메소드();
     * });
     * 
     * @event module:Hanatour/components/selectbox~complete'selectbox
     */

    /**
     * new Hanatour.components.selectbox(_target, _options);
     * @function Hanatour'components'selectbox
     * @static
     * @param {String|jQueryObject}    _target 적용대상의 jquery 셀렉터
     * @param {Object}                 _options 옵션값
     * @property _options
     * @property {Number}       _options.width                              - 셀렉트 가로 크기
     * @property {Number}       _options.height                             - 스크롤바 한계높이
     * @property {String}       _options.direction='down'                   - 열리는 방향 ['up'|'down']
     * @property {Number}       _options.speed=250                          - 기본 속도. 닫힐 때는 이보다 절반의 속도로 닫힘
     * @property {String}       _options.aClass='on'                        - 리스트 LI의 A 태그의 오버,아웃,활성화와 div.select > a 활성화를 담당할 클래스 명
     * @property {String}       _options.divClass='select'                  - 컨테이너 DIV 태그 클래스 명
     * @property {String}       _options.btnClass='tit'                     - 클릭할 A 태그의 클래스명
     * @property {String}       _options.conClass='overcon'                 - UL 감싸고 있는 DIV 클래스명
     * @property {String}       _options.ulClass='con'                      - UL 클래스명
     * @property {String}       _options.initClas='init'                    - 초기화 완료 클래스
     * @property {String}       _options.chooseClass                        - 선택과 미선택 구분 클래스
     * @property {String}       _options.disabledClass='selDisabled'        - 셀렉트 박스 비활성화 클래스
     * @property {String}       _options.disabledItemClass='disabled'       - 리스트 아이템 비활성화 클래스
     * @property {Boolean}      _options.autoClose=false                    - pulldown 인 경우 리스트에서 포커스가 빠지면 자동으로 닫힐지 유무
     * @property {String}       _options.multiText                          - 텍스트에 구분자를 지정하여 <span 태그로 래핑
     * @property {Number}       _options.zindex=84212                       - 열릴 때 z-index 값
     * @property {Boolean}      _options.autoListWidth=true                 - 리스트 크기가 가장 긴 텍스트에 맞게 자동 설정
     * @property {Boolean}      _options.tooltip=true                       - 툴팁 유무
     * @property {Function}     _options.complete                           - 생성완료 콜백 함수
     * 
     */
    var wddoObj = function (_target, _options) {
        var scope,                      //현 함수의 인스턴트
            $container,                 //디자인 selectBox와 히든 input 을 담고 있는 컨테이너
            $target,                    //div >> a, ul 형태를 가지고 있는 DIV
            $btnA,                      //열고 닫기를 할 버튼 a
            $listCon,                   //리스트 ul 감싸고 있는 DIV
            $listUL,                    //리스트 ul
            $listA,                     //li 속 a
            $roundDIV,                  //ul 하단 라운드 레이아웃 담당하는 DIV x2
            $maskDIV,                   //트윈 DIV 를 감싸고 영역밖으로 overflow:hidden; 인 마스크 DIV
            $tweenDIV,                  //트윈이 일어나는 DIV
            $hiddenSelect,              //숨겨진 <select> 태그
            itemWidth,                  //리스트안에 li 아이템 넓이
            itemHeight,                 //리스트안에 li 아이템 높이
            listWidth,                  //리스트 최종적 넓이(ul tweenDiv border 포함)
            listHeight,                 //리스트의 스크롤링 되지 않은 최종적 높이
            btnWidth,                   //열고 닫기를 할 버튼의 넓이
            btnHeight,                  //열고 닫기를 할 버튼의 높이
            isValue,                    //<select> 형태일지 pulldown 형태일지 결정할 변수
            isScroll = false,           //jScroll 적용시 높이보다 리스트가 작으면 스크롤이 생기지 않는것 감안하여 스크롤바가 있는지 없는지 유무
            isDisabled = false,         //<select> tag 에 disabled 되었는지 유무
            isEvent = false,            //이벤트가 적용되었는지 유무
            opts,                   
            defaults = defaultOptions(),//기본값
            selectIndex,                //selectbox 의 인덱스 넘버
            selectText,                 //selectbox 의 레이블명
            selectValue,                //selectbox 의 숨은 값
            jscroll,                    //jScroll 인스턴트
            zindex,                     //$target 부모의 zindex 값(일반상태), opts.zindex 는 open 시
            previousFilter, filterTimer;//키워드 검색에 필요한 변수 //add toggleTooltip 
        
        function defaultOptions() {
            return {
                height: undefined,
                width: undefined,
                direction: 'down',
                speed: 250,
                aClass: 'on',
                divClass: 'select',
                btnClass: 'tit',
                conClass: 'overcon',
                ulClass: 'con',
                initClass: 'init',
                chooseClass: undefined,
                disabledClass: 'selDisabled',
                disabledItemClass: 'disabled',
                autoClose: false,
                multiText: undefined,
                zindex: 84212,
                autoListWidth: true,
                tooltip: true,
                complete: undefined
            };
        }
        
        //init
        function init() {
            opts = $.extend(defaults, _options);
            
            createLayout();
            
            $container = $target.parent();
            $btnA = $target.find('a:eq(0)');
            $listCon = $target.find('div:eq(0)');
            $listUL = $listCon.find('ul');
            $listA = $listUL.find('li > a');
            $roundDIV = $listCon.find('> div');

            isValue = ($listA.data('value') !== undefined) ? true : false;
        }
        
        //<select> tag choose
        function createLayout() {
            if ($target.is('select')) {
                $hiddenSelect = $target;
                $hiddenSelect.data('select', true);
                var con, ul, li, a;
                var title = ($target.attr("title") !== undefined) ? $target.attr("title") : '';
                var text, cls, htmlText, textArr, classArr, optDisabled;

                //$target : <select> tag -> <div> tag
                $target = $hiddenSelect.before('<div class="' + opts.divClass + '"><a href="#" class="' + opts.btnClass + '" title="' + title + '"><span></span></a></div>').prev();

                con = $target.append('<div class="' + opts.conClass + '"></div>').find('> div');
                ul = con.append('<ul class="' + opts.ulClass + '"></ul>').find('ul');
                con.append('<div class="selectL"></div><div class="selectR"></div>').find('> div'); //round layout

                $hiddenSelect.find('option').each(function () {
                    li = ul.append('<li><a href="#"></a></li>').find('li:last');
                    a = li.find('> a');
                    text = $(this).text();
                    optDisabled = ($(this).attr('disabled') === 'disabled'); //add 1.5.6
                    textArr = (opts.multiText === undefined) ? [text] : text.split(opts.multiText);
                    classArr = ($(this).attr('class') === undefined) ? [] : $(this).attr('class').split(' ');
                    htmlText = '';

                    //optinos disabled //add 1.5.6
                    li.filter(function () {
                        return optDisabled
                    //}).hide().addClass(opts.disabledItemClass); //modify 1.5.9 //del 1.6.4
                    }).addClass(opts.disabledItemClass)./*css('opacity', 0.5).*/filter(function () {return $(this).index() === 0}).hide(); //add 1.6.4

                    //multi text
                    $(textArr).each(function (idx){
                        cls = (classArr[idx] !== undefined) ? classArr[idx] : '';
                        htmlText += '<span' + ( (classArr.length !== 0) ? ' class="' + cls + '"' : '' ) + '>' + textArr[idx] + '</span>';
                    });
                    
                    a.html(htmlText).data('value', $(this).attr('value'));
                });
                
                $hiddenSelect.css('display', 'none');
            }
        }

        //init layout
        function initLayout() {
            //width - width();
            //height - outerHeight();
            //roundDIV exception
            
            zindex = $container.css('z-index');
            
            //add 1.5.3
            $hiddenSelect.parents().filter(function () {
                return $(this).css('display') === 'none'
            }).show().addClass('unhide_wddo');
            
            $listCon.css('display', 'block');
            $tweenDIV = $listCon.wrap('<div class="maskDiv_wddo" style="*position: relative;"><div class="tweenDiv_wddo">').parent();
            $maskDIV = $tweenDIV.parent();

            var li = $listUL.find('> li').not(':hidden').filter(':first'); //modify 1.5.6, add ".not(':hidden')"
            var bwListUL = getBorderWidth($listUL);
            var bwTweenDIV = getBorderWidth($tweenDIV);
            var bhListUL = getBorderHeight($listUL);
            var bhTweenDIV = getBorderHeight($tweenDIV);

            //auto list width //add 1.5.9
            var maxItemWidth = 0;
            if (opts.autoListWidth) maxItemWidth = getMaxItemWidth($listA);

            //container //add 1.4.5
            if (opts.width === undefined) opts.width = $container.width();
            if (!isNaN(opts.width)) $container.css('width', opts.width); //fix selectbox width //add 1.6.3 !isNaN(opts.width)

            //btn
            btnWidth = $btnA.width();
            btnHeight = $btnA.outerHeight();

            changeBtnWidth(); //modify 1.6.3
            
            //item //add 1.4.7
            itemWidth = (maxItemWidth) ? Math.max(maxItemWidth, li.width()) : li.width(); //modify 1.5.9, add maxItemWidth
            itemHeight = li.outerHeight();

            //list
            listWidth = itemWidth + bwListUL + bwTweenDIV;
            listHeight = ($listUL.children()/*.not('.disabled')*/.filter(function() { //del 1.6.4 .not()
                return !($(this).hasClass(opts.disabledItemClass) && $(this).index() === 0) //add 1.6.4
            }).length * itemHeight) + bhListUL; //$listUL.outerHeight(); crossbrowser error
            
            //add 1.6.5
            $listCon.css({
                'overflow-y': 'auto',
                'overflow-x': 'hidden',
                'height': listHeight
            });

            $roundDIV.css({
                'position' : 'relative',
                'marginTop' : -$roundDIV.outerHeight()
            }).filter(':eq(1)').css({'marginLeft' : listWidth - $roundDIV.outerWidth()});

            $tweenDIV.css({
                'height' : listHeight
            });
            
            $maskDIV.css({
                'position' : 'absolute',
                'overflow' : 'hidden',
                'left': '0',
                'top' : btnHeight,
                //'width' : listWidth/* + ((opts.height !== undefined && opts.height < listHeight && maxItemWidth > li.width()) ? 17 : 0)*/, //del 1.6.5
                'height' : listHeight + parseInt($listUL.css('paddingTop')) + parseInt($listUL.css('paddingBottom')) //list top&bottom space //add 1.5
            });

            //버튼 보다 리스트가 작으면 강제 width 설정 //add 1.6.5
            if (opts.width > $listCon.width() + bwTweenDIV || !opts.autoListWidth) $maskDIV.css('width', listWidth);

            //IE7-
            IE7Fix();
            
            //scroll apply
            addScroll();

            //add scroll : layout reset
            if (isScroll) {
                itemWidth = li.width();

                listWidth = itemWidth + bwListUL + bwTweenDIV;
                $roundDIV.filter(':eq(1)').css({'marginLeft' : listWidth - $roundDIV.outerWidth()});
                $maskDIV.css('height', opts.height);
                $tweenDIV.css('height', opts.height);
            }

            //direction
            modifyDirection();
        }

        //change btn width
        function changeBtnWidth() {
            if (opts.width === 'auto') {
                var chooseItemA = $listA.eq(selectIndex);

                var chooseItemWidth = getMaxItemWidth(chooseItemA);
                var scrollDistance = parseInt(chooseItemA.css('marginRight'));
                var bwListUL = getBorderWidth($listUL);
                var bwTweenDIV = getBorderWidth($tweenDIV);
                var maskRightDistance = parseInt($maskDIV.css('paddingRight')) + parseInt($maskDIV.css('marginRight'));
 
                btnWidth = chooseItemWidth + bwListUL + bwTweenDIV + maskRightDistance - scrollDistance;

                $container.css('width', btnWidth);
            }

            //btn A > span blank // - 5 add 1.4.4
            var btnAMultiLine = $btnA.find('> span').css('white-space') !== 'nowrap';
            var btnABlank = (opts.width !== undefined && !isNaN(opts.width)) ? 5 : 0; //add 1.6.3 !isNaN(opts.width)
            $btnA.find('> span').css(((!btnAMultiLine) ? 'width' : 'paddingRight'), ((!btnAMultiLine) ? (btnWidth - btnABlank) : btnABlank));
        }
        
        //get max item width //1.5.9
        function getMaxItemWidth(_target) {
            var targetAs = _target;
            var maxItemWidth = getMaxTextWidth(targetAs);

            var paddingL = parseInt($listA.css('paddingLeft'));
            var marginR = parseInt($listA.css('marginRight'));

            if (!isNaN(paddingL) && !isNaN(marginR)) maxItemWidth += (paddingL * 2) + marginR;

            return maxItemWidth;
        }

        //get max text width //1.5.9
        function getMaxTextWidth(_target) {
            var targetAs = _target;
            var max = 0;
            var targetA, wid;

            targetAs.each(function () {
                targetA = $(this);
                wid = getTextWidth(targetA);

                targetA.data('inner-text-width', wid); //save

                if (max < wid) max = wid;
            });

            return max;
        }

        //get text width //1.5.9
        function getTextWidth(_target) {
            var targetA = _target;
            var itemWidth = 0;

            if (targetA.length === 1) {
                var targetSPAN = targetA.find('> span:first');
                var siblingsSPAN = targetSPAN.siblings('span');

                itemWidth = targetSPAN.outerWidth();

                if (siblingsSPAN.length > 0) { //multi <span>
                    siblingsSPAN.each(function () {
                         itemWidth += $(this).outerWidth();
                    });
                }
            }

            return itemWidth;
        }

        //get border left, right //add 1.4.8
        function getBorderWidth(_target) {
            //ie8- css 'border-left-width' 'border-right-width' default value 'medium'
            var borderLeftWidth = parseInt(_target.css('border-left-width')) | 0;
            var borderRightWidth = parseInt(_target.css('border-right-width')) | 0;

            return borderLeftWidth + borderRightWidth;
        }
        
        //get border top, bottom //add 1.4.9
        function getBorderHeight(_target) {
            //ie8- css 'border-top-width' 'border-bottom-width' default value 'medium'
            var borderTopHeight = parseInt(_target.css('border-top-width')) | 0;
            var borderBottomHeight = parseInt(_target.css('border-bottom-width')) | 0;

            return borderTopHeight + borderBottomHeight;
        }
        
        //IE7 fixed
        function IE7Fix() {
            var agt= navigator.userAgent.toLowerCase();
            
            if (agt.indexOf("msie 7" ) != -1) {
                $btnA.css('cursor', 'pointer');
            }
        }
        
        //add scroll-pane
        function addScroll() {
            if (opts.height !== undefined && opts.height < listHeight) {
                $listUL.css('height', '100%'); //add 1.5.8

                var pane = $listCon.show().wrap('<div class="scroll-pane"></div>').parent();

                pane.css({
                    'overflow' : 'auto',
                    'height' : opts.height
                });
                
                pane.on('jsp-initialised', function (e, _isScroll) {
                    isScroll = _isScroll;
                    
                    if (isScroll) {
                        //non .jspPane scroll padding
                        var jspPane = pane.find('.jspPane');
                        var bwTweenDIV = getBorderWidth($tweenDIV);
                        
                        //jspPane.css('width', listWidth - bwTweenDIV); //del 1.6.5
                    }
                });
                
                if ($.fn.kinetic === undefined) { //add 1.7.0
                    //create jscroll
                    jscroll = pane.jScrollPane({
                        verticalGutter: 0, //add 1.6.5
                        showArrows: true,
                        verticalDragMinHeight: 30,  //min height with vertical scroll bar
                        mouseWheelSpeed: itemHeight //mousewheel distance //add 1.5.4
                    });
                    
                    pane.attr('tabIndex', -1);
                } else {
                    //add //add 1.7.0
                    pane.kinetic({
                        cursor : 'pointer',
                        moved : function () {
                            if (this.state !== 'mouseup') this.state = 'moved';
                        },
                        stopped : function () {
                            setTimeout(function () {pane.data('kinetic').state = 'stopped';}, 50);
                        },
                        filterTarget : function (target, e) {
                            if (this.state !== 'stopped') this.state = e.type;
                        }
                    });

                    pane.data('kinetic').state = 'stopped';
                    
                    $tweenDIV.css('height', opts.height);
                    $maskDIV.css('height', opts.height);

                    pane.on('scroll.kinetic', function (e) {
                        if (pane.length > 0) pane.data('kinetic').state = 'stopped';
                    });
                }
            }
        }
        
        //add direction
        function modifyDirection() {
            if (opts.direction !== 'down') {
               $maskDIV.css({
                    'marginTop': -$maskDIV.outerHeight() - btnHeight
               });
            }
        }
        
        function open(_isOpen, _speed) {
            var speed = (_speed !== undefined) ? _speed : ((_isOpen) ? opts.speed : opts.speed / 2);
            var direction = (opts.direction === 'down') ? -1 : 1;

            if (_isOpen) $container.css('z-index', ($target.data('zindex') === undefined) ? opts.zindex : parseInt($target.data('zindex'))); //modify 1.5.7
            
            if ($tweenDIV.length !== 0) {
                var top = (_isOpen) ? 0 : $maskDIV.outerHeight() * direction; //open 0
                
                if (speed > 1) {
                    $maskDIV.add($listCon).show();
                }//else default close

                toggleDocumentEvent(); //add 1.6.7

                $tweenDIV.stop().animate({
                    'marginTop': top
                },{queue:false, duration:speed, complete:comp});
            }
            
            //toggle document event //add 1.6.7
            function toggleDocumentEvent() {
                if (!_isOpen) {
                    removeDocumentEvent();
                } else {
                    addDocumentEvent();
                    removeTooltip(); //add 1.6.1 important remove tooltip
                }
            }

            //transition complete function
            function comp () {
                //close complete
                if (!_isOpen) {
                    $maskDIV.hide();
                    //removeDocumentEvent(); //del 1.6.7
                    $btnA.removeClass(opts.aClass);
                    $container.css('z-index', zindex);
                } else {
                //open complete
                    //addDocumentEvent(); //del 1.6.7
                    //removeTooltip(); //add 1.6.1 important remove tooltip
                }
            }
        }
        
        //document event
        function addDocumentEvent() {
            $(document).on('mousedown.selectbox', function (e) { //modify 1.6.7 'click' -> 'mousedown'
                //var currentTarget = $(e.currentTarget);
                var target = $(e.target);
                var isOpen = ($target.data('state') === 'open');

                //if (target.closest('.jspContainer').length === 0 && isOpen) {     //del 1.6.7
                if (!target.closest('.' + opts.divClass).is($target) && isOpen) {   //add 1.6.7
                    changeBtnState(false);
                }
            });
        }
        
        function removeDocumentEvent() {
            $(document).off('mousedown.selectbox'); //modify 1.6.7 'click' -> 'mousedown'
        }
        
        //check tooltip //add 1.6.1
        function toggleTooltip() {
            if (opts.autoListWidth && opts.tooltip) {
                var isOver = $listA.eq(selectIndex).data('inner-text-width') > getTextWidth($btnA); //modify 1.6.8 $btnA.width() -> getTextWidth($btnA)
                var isOpen = ($target.data('state') === 'open');

                if (isOver && !isOpen) {
                    addTooltip();
                } else {
                    removeTooltip();
                }
            }
        }

        //add tooltip
        function addTooltip() {
            if (opts.autoListWidth && opts.tooltip) {
                if ($container.next('.tooltipDiv_wddo').length === 0) $container.after('<div class="tooltipDiv_wddo">'); //create tooltip

                var tooltip = $container.next('.tooltipDiv_wddo');
                tooltip.empty();

                tooltip.css({
                    /*'left' : $container.offset().left,*/
                    /*'top' : $container.offset().top,*/
                    'z-index' : zindex + 1
                }).html('<span>' + $btnA.text() + '</span>');

                var tooltipTop = ($container.css('float') === 'left') ? 0 : -Math.max($container.outerHeight(), $btnA.outerHeight()); //modify 1.6.8
                tooltip.css('marginTop', tooltipTop - tooltip.outerHeight()); //modify 1.6.8
            }
        }

        //important remove tooltip
        function removeTooltip() {
            if (opts.autoListWidth && opts.tooltip) {
                var tooltip = $container.next('.tooltipDiv_wddo');

                if (tooltip.length > 0) tooltip.remove();
            }
        }

        //event
        function initEvent() {
            isEvent = true;
            
            //btn a handler
            $btnA.on('click.selectbox', function (e) {
                var target = $(e.currentTarget);
                var toggle = ($target.data('state') !== 'open'); //true : open

                changeBtnState(toggle); //open & close
                //if (selectIndex !== undefined && toggle) selectList($listA.eq(selectIndex)); //list on, if open // delete 1.4.4
                if (selectIndex !== undefined && toggle) $listA.eq(selectIndex).triggerHandler('mouseover.selectbox'); // add 1.4.8
                if ((!isValue && jscroll !== undefined) && toggle) changeScroll(0); //if pulldown menu & jscroll

                e.preventDefault();
            });

            $btnA.on('focusin.selectbox mouseover.selectbox', function (e) {
                toggleTooltip();
            });

            $btnA.on('focusout.selectbox mouseout.selectbox', function (e) {
                var target = $(e.currentTarget);
                if (target.filter(':focus').length === 0) removeTooltip();
            });
            
            //<select> version
            if (isValue) {
                $btnA.add($listA).on('keydown.selectbox', function (e) {
                    var target = $(e.currentTarget);
                    var keyCode = (e.keyCode >= 96 && e.keyCode <= 105) ? e.keyCode - 48 : e.keyCode; //modify 1.6.4
                    var idx = scope.getIndex() || 0;
                    var altOpen = (e.altKey && (keyCode == 40 || keyCode == 38)); //down, up key
                    var isOpen = ($target.data('state') === 'open');
                    var li = $listUL.find('li');

                    if (altOpen) previousFilter = undefined;

                    //toggle alt + 'up' 'down' and 'spacebar' key (not search)
                    if (altOpen /*&& !isOpen*/ || keyCode === 32 && previousFilter === undefined) { //modify 1.6.4.. delete '&& !isOpen'
                        changeBtnState(!isOpen, 2); //modify 1.6.4.. true -> !isOpen
                        if (!isOpen) selectList($listA.eq(idx)); //modify 1.6.4.. add 'if (!isOpen)'
                        
                        e.preventDefault();
                    } else {
                        switch (keyCode) {
                            case 13 : //enter 
                                if (target.is($btnA)) {
                                    e.preventDefault();
                                    if (isOpen) { //choose list and btn focus
                                        changeBtnState(false);
                                        toggleTooltip();
                                    } else { //add 1.6.9 //press enter key and open list
                                        changeBtnState(true, 2);
                                        selectList($listA.eq(idx));
                                    }

                                    e.preventDefault();    
                                }
                                break;
                            case 9 : //tab, is open
                                if (isOpen) {
                                    e.preventDefault();
                                    changeBtnState(false);
                                
                                    e.preventDefault();
                                }
                                break;
                            case 34 : //pagedown //add 1.6.4
                                //If it's not open, Move 3
                                //If it's open and scrolling, Move as much as the visible list
                                var nextAllLI = li.eq(idx).nextAll(':not(".' + opts.disabledItemClass + '")');
                                var viewNum = Math.round(opts.height / itemHeight);
                                var jumpNum = Math.min(((isOpen) ? viewNum : 3), nextAllLI.length);
                                var nextLI = nextAllLI.slice(0, jumpNum).last();

                                if (nextLI.index() > -1) selectList(nextLI.find('a'));
                                
                                e.preventDefault();
                                break;
                            case 35 : //end
                                selectList(li.not('.' + opts.disabledItemClass).filter(':last').find('a'));

                                e.preventDefault();
                                break;
                            case 40 : //down, right
                            case 39 :
                                //if (scope.getIndex() !== undefined) {//not label //del 1.6.4
                                    var nextLI = li.eq(idx).nextAll().not('.' + opts.disabledItemClass).filter(':first');

                                    if (nextLI.index() > -1) selectList(nextLI.find('a'));
                                /*} else {
                                    selectList($listA.eq(idx));
                                }*/
                                
                                e.preventDefault();
                                break;
                            case 33 : //pageup //add 1.6.4
                                var prevAllLI = li.eq(idx).prevAll(':not(".' + opts.disabledItemClass + '")');
                                var viewNum = Math.round(opts.height / itemHeight);
                                var jumpNum = Math.min(((isOpen) ? viewNum : 3), prevAllLI.length);
                                var prevLI = prevAllLI.slice(0, jumpNum).last();

                                if (prevLI.index() > -1) selectList(prevLI.find('a'));

                                e.preventDefault();
                                break;
                            case 36 : //home
                                selectList(li.not('.' + opts.disabledItemClass).filter(':first').find('a'));

                                e.preventDefault();
                                break;
                            case 38 : //up, left
                            case 37 :
                                var prevLI = li.eq(idx).prevAll().not('.' + opts.disabledItemClass).filter(':first');

                                if (prevLI.index() > -1) selectList(prevLI.find('a'));
                            
                                e.preventDefault();
                                break;
                            default :
                                //add 1.6
                                var preventDefault = false;
                                var prev = previousFilter || "";
                                var character = String.fromCharCode(keyCode);
                                var skip = false;
                                var active = $listA.eq(selectIndex).parent(); //li
                                var match; //li

                                clearTimeout(filterTimer);

                                if (character === prev) {
                                    skip = true;
                                } else {
                                    character = prev + character;
                                }

                                match = filterMenuItems(character).parent(); //search
                                match = skip && match.index( active.next() ) !== -1 ?
                                    active.not('.' + opts.disabledItemClass) :
                                    match;

                                //not match, research
                                if (!match.length) {
                                    character = String.fromCharCode(keyCode);
                                    match = filterMenuItems(character);
                                }

                                if (match.length) {
                                    selectList(match.filter(':first').find(' > a')); //this.focus( event, match );
                                    previousFilter = character;
                                    filterTimer = delay(function() {
                                        previousFilter = undefined;
                                    }, 1000 );
                                }else{
                                    previousFilter = undefined;
                                }

                                e.preventDefault();
                        };//end switch
                    }
                });
                
                if ($hiddenSelect !== undefined) {
                    //<select> tag change -> selecbox change 
                    $hiddenSelect.bind('change.selectbox', function (e) {
                        //selectList() copy
                        var target = $listA.eq($hiddenSelect[0].selectedIndex);
                        var text = target.text();
                        var html = target.html();
                        var value = target.data('value');
                        var idx = target.closest('li').index();

                        if (isDisabled) return false;

                        selectIndex = idx;
                        
                        $listA.eq(selectIndex).triggerHandler('mouseover.selectbox');
                        
                        changeText(text, html);
                        changeValue(value);
                        changeScroll();
                        changeChoose();

                        $target.trigger('change.selectbox', scope.getInfo());  // add 1.5.5
                    });
                }
                
            } else {
            //pulldown menu version
                if (opts.autoClose) {
                   $listA.on('focusin.selectbox', function (e) {
                        changeBtnState(true);
                   });
                   
                   $listA.on('focusout.selectbox', function (e) {
                        changeBtnState(false);
                   });
                }
            }

            //list a handler
            $listA.on('click.selectbox', function (e) {
                var target = $(e.currentTarget);
                var li = target.closest('li');

                //add 1.7.0
                if ($container.find('.kinetic-active').length > 0 && $container.find('.kinetic-active').data('kinetic').state !== 'stopped') {e.preventDefault(); return;}

                if (li.hasClass(opts.disabledItemClass)) {e.preventDefault(); return;} //add 1.6.4

                if (isValue) {
                    e.preventDefault();

                    selectList(target);
                    changeBtnState(false);
                    if ($btnA !== undefined) $btnA.focus();
                }
            });
            
            $listA.on('mouseover.selectbox focusin.selectbox', function (e) {
                var target = $(e.currentTarget);
                var li = target.closest('li');
                var idx = li.index();
                
                if (li.hasClass(opts.disabledItemClass)) return; //add 1.6.4

                //all remove class form list <A> & add class
                $listA.removeClass(opts.aClass).eq(idx).addClass(opts.aClass);
            });
        }
        
        //search keyword to item //add 1.6 
        function filterMenuItems(character) {
            var escapedCharacter = character.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" ),
                regex = new RegExp( "^" + escapedCharacter, "i" );

            return $listA.filter(function () {
                return !$(this).parent().hasClass(opts.disabledItemClass);
            }).filter(function() {
                return regex.test($.trim($( this ).text()));
            });
        }

        //extend timeout //add 1.6 
        function delay(handler, delay) {
            function handlerProxy() {
                return ( typeof handler === "string" ? instance[ handler ] : handler )
                    .apply( instance, arguments );
            }
            var instance = this;
            return setTimeout( handlerProxy, delay || 0 );
        }

        function removeEvent() {
            isEvent = false;
            
            $listA.off('.selectbox');
            $btnA.off('.selectbox');
            $(document).off('.selectbox');
            if ($hiddenSelect !== undefined) $hiddenSelect.off('.selectbox');
        }
        
        //init attribute from <select>
        function initAttribute() {
            //select first 
            if ($hiddenSelect !== undefined) {
                var selectedIdx = ($hiddenSelect.find('> option:selected').length > 0) ? $hiddenSelect.find('> option:selected').index() : 0;

                $hiddenSelect.find('option').removeAttr('selected').eq(selectedIdx).prop('selected', true); // add 1.6.6
                
                //scope.setIndex(selectedIdx); // del 1.5.2
                changeBtnState(true, 0);
                selectList($listA.eq(selectedIdx), true);
                changeBtnState(false, 0);
                
                scope.setDisabled($hiddenSelect.prop('disabled')); // modify 1.5.7
                
                $hiddenSelect.trigger('complete.selectbox'); // add 1.4.6
            } else {
                scope.setDisabled(false);
            }
        }
        
        //select list & close
        function selectList(_target, _first) {
            var target = _target; //li tag
            var text = target.text();
            var html = target.html();
            var value = target.data('value');
            var idx = target.closest('li').index();
            var isFirst = (_first !== undefined) ? _first : false; // add 1.5.2

            if (isDisabled) return false;

            if (isValue) {
                //idx save
                selectIndex = idx;
                
                $listA.eq(selectIndex).triggerHandler('mouseover.selectbox');
                
                //add 1.5.9
                if (isFirst) {
                    changeText(text, html);
                    changeValue(value);
                    changeScroll();
                    changeChoose();
                } else {
                    changeHiddenSelect();
                }

                /*
                //remove 1.5.9
                changeText(text, html);
                changeValue(value);
                changeScroll();
                changeChoose();
                if (!isFirst) changeHiddenSelect();
                */

                toggleTooltip(); //add 1.6.1
            } else {
                changeScroll(0); //init scroll ypos
                $target.trigger('change.selectbox', scope.getInfo()); //add 1.5.5     
            }
            
            //event binding
            //$target.trigger('change.selectbox', scope.getInfo());   //del 1.5.5 //changeHiddenSelect() -> $hiddenSelect.bind('change.selectbox') -> $target.trigger('change.selectbox')
        }
        
        //change btn state
        function changeBtnState(_value, _speed) {
            var speed = _speed;
            
            if (isDisabled || $target === undefined || $btnA === undefined || $listA === undefined) return false;

            if ($listA !== undefined) $listA.removeClass(opts.aClass);
            
            if (_value) { //open
                $target.data('state', 'open');
                open(true, speed);
                $btnA.addClass(opts.aClass);
            } else { //close
                $target.removeData('state');
                open(false, speed);
                //$btnA.removeClass(opts.aClass); //code move: motion complete 
            }
        }
        
        //text change
        function changeText(_txt, _html) {
            $btnA.children().html(_html);
            
            //btnA multiline //add 1.4.8
            btnHeight = $btnA.outerHeight();
            if (opts.direction === 'down') $maskDIV.css('top', btnHeight);
            
            //auto fit container width //add 1.6.3 
            if (opts.width === 'auto') changeBtnWidth();

            selectText = _txt;
        }
        
        //value change
        function changeValue(_value) {
            selectValue = _value;
        }
        
        //scroll move
        function changeScroll(_ypos) {
            if ($target.find('.jspDrag').length > 0) {
                var idx = selectIndex - $hiddenSelect.find('option:disabled').length; //add 1.5.6
                var ypos = (_ypos !== undefined) ? _ypos : itemHeight * idx;
                
                jscroll.data('jsp').scrollToY(ypos);
            }
        }

        //toggle choose class for div.select //add 1.5.6
        function changeChoose() {
            if ($hiddenSelect !== undefined && opts.chooseClass !== undefined) {
                if ($hiddenSelect.find('option').eq(selectIndex).is(':disabled')) {
                    $target.removeClass(opts.chooseClass);
                } else {
                    $target.addClass(opts.chooseClass);
                }
            }
        }
        
        //<select> tag change
        //selecbox change -> <select>
        /**
         * Attack an innocent (or guilty) person with a change.
         *
         * @method
         * @fires module:Hanatour/components/selectbox~change
         */
        function changeHiddenSelect() {
            if ($hiddenSelect !== undefined) {
                $hiddenSelect.find('option')/*.removeAttr('selected')*/.eq(selectIndex).prop('selected', true).end().end().trigger('change'); // modify 1.5.5, 'change.selectbox' -> 'change' //modify 1.6.6.. delete .removeAttr('selected') 
                //$hiddenSelect.val(selectValue).trigger('change'); // error : <option> attribute "value" same
            }
        }

        return {
            /**
             * 디자인 셀렉트 생성 (new Hanatour.components.selectbox() 선행)
             * @instance
             */
            init : function () {
                $target = (_target.jquery === undefined) ? $(_target) : _target;
          
                if ($target.length > 0) {
                    if ($target.is('select') && $target.data('select') !== undefined) return false;  //avoid duplication
                    
                    scope = this;
                    
                    init();
                    initLayout();
                    
                    //scope
                    if ($target.data('scope') === undefined) $target.data('scope', scope);
                    
                    initAttribute();
                    
                    $hiddenSelect.parents('.unhide_wddo').hide().removeClass('unhide_wddo'); //add 1.5.3
                    
                    $container.addClass(opts.initClass);

                    if (opts.complete !== undefined && typeof opts.complete === 'function') opts.complete({target: $target});
                }
            },
            
            /**
             * select 태그를 토대로 재적용
             * @instance
             * @param {Boolean} _trigger=true   false 시 $hiddenSelect 에 대하여 change 이벤트 발생 안함
             */
            setReset : function (_trigger) {
                var isTrigger = (_trigger === undefined) ? true : _trigger;

                scope.dispose();
                scope.init();
                if (isTrigger) changeHiddenSelect(); //add 1.5.5
            },
            
            /**
             * 디자인 셀렉트 삭제
             * @instance
             */
            dispose : function () {
                //remove animate infomation
                $listCon.parent('div').stop().css('marginTop', '');
                
                //remove scroll source
                if (jscroll !== undefined && jscroll.data('jsp') !== undefined) {
                    jscroll.data('jsp').destroy();
                    $listCon.unwrap('<div>');
                }
                
                //remove mask source
                $listCon.unwrap('<div>').unwrap('<div>');
                
                //remove event
                removeEvent();
                
                //init
                selectIndex = undefined;
                selectText = undefined;
                selectValue = undefined;
                jscroll = undefined;
                zindex = undefined;
                
                //add 1.6
                previousFilter = undefined;
                filterTimer = undefined;
                
                $target.removeData('scope');
                $target.removeData('state');
                $listA.removeData('inner-text-width'); //add 1.5.9
                $listA.removeData('value'); //add 1.5.9
                $container.removeClass(opts.initClass);
                $listA.removeClass(opts.aClass);
                $btnA.removeClass(opts.aClass);
                $listCon.hide();
                
                if ($hiddenSelect !== undefined) {
                    $hiddenSelect.css('display', '');
                    $hiddenSelect.siblings('div.' + opts.divClass).remove();
                    $hiddenSelect.removeData('select');
                    
                    $hiddenSelect.find('option').removeProp('selected'); //add 1.6.3
                    $hiddenSelect.get(0).selectedIndex = ($hiddenSelect.find('option[selected]') ? $hiddenSelect.find('option[selected]').index() : 0); //add 1.6.6
                }

                if ($.fn.kinetic !== undefined) $container.find('.kinetic-active').off('.kinetic').removeData('kinetic'); //add 1.7.0
                
                //scope = undefined;
                $container = undefined;
                $target = undefined;
                $btnA = undefined;
                $listCon = undefined;
                $listUL = undefined;
                $listA = undefined;
                $roundDIV = undefined;
                $maskDIV = undefined;
                $tweenDIV = undefined;
                $hiddenSelect = undefined;
                itemWidth = undefined;
                itemHeight = undefined;
                listWidth = undefined;
                listHeight = undefined;
                btnWidth = undefined;
                btnHeight = undefined;
                isValue = undefined;
                isScroll = false;
                isDisabled = false;
                isEvent = false;
                opts = undefined;
                defaults = defaultOptions();
            },
            
            /**
             * div 타깃 반환
             * @instance
             * @return {jqueryObject} div.select
             */
            getTarget : function () {
                return $target;  
            },
            
            /**
             * 정보반환
             * @instance
             * @return {Object} change 이벤트의 param 와 같음
             */
            getInfo : function () {
                return {
                    index: selectIndex,
                    value: selectValue,
                    text: selectText
                };
            },
            
            /**
             * index로 선택
             * @instance
             * @param {Number} _idx 선택하려는 index값
             */
            setIndex : function (_idx) {
                if ($listA.eq(_idx).parent().hasClass('disabled')) return; //add 1.5.9

                changeBtnState(true, 0);
                selectList($listA.eq(_idx));
                changeBtnState(false, 0);
            },
            
            /**
             * index 반환
             * @instance
             * @return {Number} 현재 index값
             */
            getIndex : function () {
                return selectIndex;  
            },
            
            /**
             * value로 선택
             * @instance
             * @param {String} _value 선택하려는 value값 
             */
            setValue : function (_value) {
                var idx;
                $listA.each(function () {
                    if ($(this).data('value') === _value) {
                        idx = $(this).closest('li').index();
                        return false;
                    } 
                });
                
                this.setIndex(idx);
            },
            
            /**
             * value 반환
             * @instance
             * @return {String} 현재 value값 
             */
            getValue : function () {
                return selectValue;
            },
            
            /**
             * text로 선택
             * @instance
             * @param {String} _value 선택하려는 text값 
             */
            setText : function (_value) {
                var idx;
                $listA.each(function () {
                    if ($(this).text() === _value) {
                        idx = $(this).closest('li').index();
                        return false;
                    } 
                });
                
                this.setIndex(idx);
            },
            
            /**
             * text 반환
             * @instance
             * @return {String} 현재 text값
             */
            getText : function () {
                return selectText;
            },
            
            /**
             * 비활성화
             * @instance
             * @param {Boolean} _value true 시 비활성화
             */
            setDisabled : function (_value) {
                var target = $target.children().eq(0); //btnA
                var txt = target.text();
                var cls = target.attr('class');

                //first
                changeBtnState(false, 0);    //default close

                if (_value) {
                    (opts.disabledClass !== undefined) ? $target.addClass(opts.disabledClass) : $target.css('opacity', 0.5);
                    
                    if ($hiddenSelect !== undefined) $hiddenSelect.prop('disabled', true);
                    
                    if (!isDisabled) target.css('display', 'none').after('<span class="' + opts.btnClass + '"><span style="width:' + target.find('> span').width() + 'px">'+target.text()+'</span></span>');
                    
                    if (isEvent) removeEvent();
                } else {
                    (opts.disabledClass !== undefined) ? $target.removeClass(opts.disabledClass) : $target.css('opacity', 1);
                    
                    if ($hiddenSelect !== undefined) $hiddenSelect.removeAttr('disabled');
                    
                    if (isDisabled) target.css('display', '').siblings('span').remove();                    
                    
                    if (!isEvent) initEvent();
                }
                
                isDisabled = _value;
            },

            package: this.package
        };
    };//end Obj

    //multiple init selectbox
    if ($ !== undefined && $.SelectBoxSet === undefined) {
        /**
         * $.SelectBoxSet('select#id', options, onComplete, isHidden); 일괄 생성(new, .init() 세트)
         * @member SelectBoxSet
         * @static
         * @param {String | jQueryObject} _target   타겟
         * @param {Object} _options  옵션
         * @param {Function} _complete 완료
         * @param {Function} _hidden   히든
         */
        $.SelectBoxSet = function (_target, _options, _complete, _hidden) {
            $(document).ready(function () {
                var complete = _complete || function () {};
                var isHidden = (_hidden === undefined) ? true : _hidden; //add 1.5.8
                var target = (typeof _target === 'string') ? $(_target) : _target;
                
                var visibleTarget = target.not(':hidden');
                var hiddenTarget = target.filter(':hidden');

                //눈에 보이는 것
                visibleTarget.each(function (idx) {
                    //<select> 미적용 대상들 적용
                    if ($(this).prev('.select').getInstance() === undefined) {
                        var selectBox = new wddoObj($(this), _options);
                        selectBox.init();
                    } else {
                    //<select> 적용 대상들 닫기
                    //하나하나 닫지 말고 $(document).triggerHandler('click.selectbox'); 발생시키는걸로 대체
                        //if ($(this).prev('.select').data('state') === 'open') {
                        //    $(this).prev('.select').find('> a').triggerHandler('click.selectbox'); //close
                        //}
                    }
                });
                
                //IE에서 느려지는 문제있어 isHidden 으로 선택 할 수 있도록 함 1.5.8
                if (isHidden) {
                    setTimeout(function () {
                        //눈에 보이는 것 먼저 적용 후 숨겨져 있는 적용
                        hiddenTarget.each(function (idx) {
                            //<select> 미적용 대상들 적용
                            if ($(this).prev('.select').getInstance() === undefined) {
                                var selectBox = new wddoObj($(this), _options);
                                selectBox.init();
                            } else {
                            //<select> 적용 대상들 닫기
                            //하나하나 닫지 말고 $(document).triggerHandler('click.selectbox'); 발생시키는걸로 대체
                                //if ($(this).prev('.select').data('state') === 'open') {
                                //   $(this).prev('.select').find('> a').triggerHandler('click.selectbox'); //close
                                //}
                            }
                        });

                        complete();
                    }, 0); //눈에 보이는것과 안보이는것 묶음 순차 발생을 위해 0 딜레이
                }

                if (!isHidden) complete();
            }); //end ready
        };
    }
    
    wddoObj.prototype.package = 'Hanatour.components.selectbox';

    return wddoObj;
});