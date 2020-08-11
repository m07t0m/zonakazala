import * as React from 'react';
import styled from 'styled-components';


const ChangeViewsection = styled.section`
  background-color: lightgrey;
  width:100%;
  position:fixed;
  height:100%;
  overflow:scroll;
  input{
    font-size:20px;
  }
  
`

const URLtextarea = styled.textarea`
    width:500px;
    height:300px;
`

const URLlabel = styled.label`
    color:#f2f2f2;
    font-size: 1.5625em;
    font-weight: bold;
    color: black !important;    
    margin-top:20px;
`

const Analaysisbutton = styled.span`
    margin:5px;            
    font-size: 1.5em;
    font-weight: 300;
    cursor: pointer;   
`
const Analaysisbuttondiv = styled.div`
    background: #4d8096;
    color: #fff;
    display: inline-block;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    font-weight: 600;
    font-size: 1rem;
    text-align: center;
    vertical-align: middle;
    line-height: 2.5rem;
    -webkit-box-shadow: 0 2px 4px rgba(77,128,150,.2);
    box-shadow: 0 2px 4px rgba(77,128,150,.2);
    border-radius: 8px;
    width:100%;
    cursor: pointer;         
    margin-top:20px;
`
const Brandbuttondiv = styled.div`
background: #4d8096; 
color: #fff;
display: inline-block;
width: -webkit-max-content;
width: -moz-max-content;
width: max-content;
font-weight: 600;
font-size: 1rem;
text-align: center;
vertical-align: middle;
line-height: 2.5rem;
-webkit-box-shadow: 0 2px 4px rgba(77,128,150,.2);
box-shadow: 0 2px 4px rgba(77,128,150,.2);
border-radius: 8px;
width:100%;
cursor: pointer;         
margin-top:20px;
margin-left:5px;
margin-right:5px;
`
const Contentlabel = styled.textarea`
    width:40vw;
    height:500px;
    background-color:white;
`
const ContentFlowdiv = styled.div`
    display:flex;
    flex-direction:column;
    text-align:left;
`
const DataViewdiv = styled.div`
    
    margin-left:auto;
    margin-right:auto;      
    margin-top:20px;
`
const WholeContextdiv = styled.div`
    display:flex;
    flex-direction:row;
`
interface IMyModuleProps {
    
}

    function httpGet(theUrl:any)
  {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
  }

  function getHTML ( url:any, callback:any ) {

	// Feature detection
	if ( !window.XMLHttpRequest ) return;

	// Create new request
	var xhr = new XMLHttpRequest();

	// Setup callback
	xhr.onload = function() {
		if ( callback && typeof( callback ) === 'function' ) {
			callback( this.responseXML );
		}
	}

	// Get the HTML
    xhr.open( 'GET', url );
    xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhr.setRequestHeader('Content-type', 'application/ecmascript');
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'true');
	xhr.responseType = 'document';
	xhr.send();

};

function doAnalysis(url: any, word: any){
    getHTML( url, function (response:any) {
        const html = response.documentElement.innerHTML;
        
        let arrayhtml = html.split('section');
        arrayhtml.map((entity:any)=>{
            if (entity.indexOf(word)>0){
                let onemodel = entity.split('<p>')
                onemodel.map((onep:any)=>{
                 if(onep.length<10){
                        console.log(onep)
                    }
                })            
            }
        })
    });    
}
function ExportToCsv(content:any){
    var FileSaver = require('file-saver');
    var BOM = "\uFEFF";
    let    csvData = BOM + content;
    var blob = new Blob([csvData], {type: "text/csv;charset=utf-8"});
    FileSaver.saveAs(blob, "test.csv");
}

function HIM(url: any, word: any, setcontent:any, ){
    let csvContent='nazwa;cena aktualna;cena 1;status;subclass;typ - komplet, 2p,3p…;opis;brand;\n' as string;
    let arrayhtml = url.split('<a class="link" href=');
        arrayhtml.map((entity:string, index: number)=>{            
            if(index===0 || entity.indexOf('PLN')<=0 || entity.startsWith('"/pl')==false || entity.length>50000){
                return;
            }
            if (word.length>0 && entity.toLowerCase().indexOf(word)>0){                
                let prodName = entity.substr(37, entity.indexOf('</a>')-37);
                csvContent=csvContent+prodName+";"
                let firstPrice
                if(entity.indexOf('<span class="price sale">')>0){
                    firstPrice = 
                        entity.substr( 
                            entity.indexOf('<span class="price sale">')+25,  
                            entity.indexOf('</span>')-(entity.indexOf('<span class="price sale">')+25))
                    csvContent=csvContent+firstPrice+";"
                    let secondPrice = 
                        entity.substr( 
                            entity.indexOf('<span class="price regular">')+28,  
                                entity.indexOf(
                                    '</span>', 
                                    entity.indexOf('<span class="price regular">')+28)-(entity.indexOf('<span class="price regular">')+28)
                        )
                    csvContent=csvContent+secondPrice+";"
                }
                else if(entity.indexOf('<span class="price regular">')>0){
                    firstPrice = entity.substr( entity.indexOf('<span class="price regular">')+28,  entity.indexOf('</span>')-(entity.indexOf('<span class="price regular">')+28))
                    csvContent=csvContent+firstPrice+";"
                }           
                if(prodName.indexOf('komplet')>0){
                    csvContent=csvContent + 'komplet'
                }
                else if(prodName.indexOf('-pak')>0){
                    csvContent=csvContent + prodName.substr(prodName.indexOf('-pak')-2,6).replace(' ','')
                }
                csvContent=csvContent+';;;H&M'+';'  
                csvContent=csvContent+'\n'
            }
            else if(word.length==0){
                let prodName = entity.substr(37, entity.indexOf('</a>')-37);
                csvContent=csvContent+prodName+";"
                let firstPrice
                if(entity.indexOf('<span class="price sale">')>0){
                    firstPrice = 
                        entity.substr( 
                            entity.indexOf('<span class="price sale">')+25,  
                            entity.indexOf('</span>')-(entity.indexOf('<span class="price sale">')+25))
                    csvContent=csvContent+firstPrice+";"
                    let secondPrice = 
                        entity.substr( 
                            entity.indexOf('<span class="price regular">')+28,  
                                entity.indexOf(
                                    '</span>', 
                                    entity.indexOf('<span class="price regular">')+28)-(entity.indexOf('<span class="price regular">')+28)
                        )
                    csvContent=csvContent+secondPrice+";"+"przecena"+";"
                }
                else if(entity.indexOf('<span class="price regular">')>0){
                    firstPrice = entity.substr( entity.indexOf('<span class="price regular">')+28,  entity.indexOf('</span>')-(entity.indexOf('<span class="price regular">')+28))
                    csvContent=csvContent+firstPrice+";;"+"cena pierwsza"+";"
                }     
                if(prodName.indexOf('komplet')>0){
                    csvContent=csvContent + 'komplet'
                }
                else if(prodName.indexOf('-pak')>0){
                    csvContent=csvContent + prodName.substr(prodName.indexOf('-pak')-2,6).replace(' ','')
                }        
                csvContent=csvContent+';;;H&M'+';'
                csvContent=csvContent+'\n'
            }
        })
        setcontent(csvContent);
}

function ZARA(url: any, word: any, setcontent:any, ){
    let csvContent='nazwa;cena aktualna;cena 1;status;subclass;typ - komplet, 2p,3p…;opis;brand;\n' as string;
    let arrayhtml = url.split('class="name _item"');
        arrayhtml.map((entity:string, index: number)=>{            
            if(index===0 || entity.indexOf('PLN')<=0){
                return;
            }
            if(word.length==0){
                if(entity.indexOf('class="sale"')>0){
                    let prodName = entity.substr(entity.indexOf('>')+1, entity.indexOf('<')-(entity.indexOf('>')+1));
                    csvContent=csvContent+prodName+";"
                    let firstPrice                
                    firstPrice = entity.substr( entity.indexOf('class="line-through" data-price="')+33,  entity.indexOf('"></span>')-(entity.indexOf('class="line-through" data-price="')+33))
                    
                    let secondPrice
                    secondPrice = entity.substr( entity.indexOf('<span class="sale" data-price="')+31,  entity.indexOf('"></span>',entity.indexOf('<span class="sale" data-price="'))-(entity.indexOf('<span class="sale" data-price="')+31))
                    
                    csvContent=csvContent+secondPrice+";"
                    csvContent=csvContent+firstPrice+";"+"przecena"+";"
                    csvContent=csvContent+';;;ZARA'+';'
                    csvContent=csvContent+'\n'
                }
                else{
                    let prodName = entity.substr(entity.indexOf('>')+1, entity.indexOf('<')-(entity.indexOf('>')+1));
                    csvContent=csvContent+prodName+";"
                    let firstPrice                
                    firstPrice = entity.substr( entity.indexOf('class="main-price" data-price="')+31,  entity.indexOf('"></span>')-(entity.indexOf('class="main-price" data-price="')+31))
                    csvContent=csvContent+firstPrice+";;"+"cena pierwsza"+";"
                    csvContent=csvContent+';;;ZARA'+';'
                    csvContent=csvContent+'\n'
                }                
            }
        })
        setcontent(csvContent);
}

function RE(url: any, word: any, setcontent:any, ){
    let csvContent='nazwa;cena aktualna;cena 1;status;subclass;typ - komplet, 2p,3p…;opis;brand;\n' as string;
    let arrayhtml = url.split('es-product-name">');
        arrayhtml.map((entity:string, index: number)=>{            
            if(index===0 || entity.indexOf('PLN')<=0 || entity.indexOf('-price')<0){
                return;
            }
            if(word.length==0){
                if(entity.indexOf('es-final-price')>0){
                    let prodName = entity.substr(entity.indexOf('">')+2, entity.indexOf('</a>')-(entity.indexOf('">')+2));
                    csvContent=csvContent+prodName+";"
                    let firstPrice                
                    firstPrice = entity.substr(entity.indexOf('<p class="es-final-price"><span>')+32,entity.indexOf('</span></p>')-(entity.indexOf('<p class="es-final-price"><span>')+32)).replace('&nbsp;',' ')
                    csvContent=csvContent+firstPrice+";;"+"cena pierwsza"+";"
                    csvContent=csvContent+';;;Reserved'+';'
                    csvContent=csvContent+'\n'
                }
                else{
                    let prodName = entity.substr(entity.indexOf('">')+2, entity.indexOf('<', entity.indexOf('">'))-(entity.indexOf('">')+2));
                    csvContent=csvContent+prodName+";"
                    let firstPrice                
                    firstPrice = entity.substr( entity.indexOf('es-discount-price"><span>')+25,  entity.indexOf('</span>',entity.indexOf('es-discount-price"><span>'))-(entity.indexOf('es-discount-price"><span>')+25)).replace('&nbsp;',' ')
                    
                    let secondPrice
                    secondPrice = entity.substr( entity.indexOf('es-regular-price"><span>')+24,  entity.indexOf('</span>',entity.indexOf('es-regular-price"><span>'))-(entity.indexOf('es-regular-price"><span>')+24)).replace('&nbsp;',' ')
                    
                    csvContent=csvContent+firstPrice+";"
                    csvContent=csvContent+secondPrice+";"+"przecena"+";"
                    csvContent=csvContent+';;;Reserved'+';'
                    csvContent=csvContent+'\n'
                }                
            }
        })
        setcontent(csvContent);
}
function checkBrand(htmldata: string){
    let branddata = htmldata.substr(htmldata.indexOf('<title>')+7, htmldata.indexOf('</title>'))
    if(branddata.toLowerCase().indexOf(' zara')>0){
        return 'zara'
    }
    else if(branddata.toLowerCase().indexOf('reserved')>0){
        return 're'
    }
    else{
        return 'hm'
    }
}

function doAnalysisonText(url: any, html: any, word: any, setcontent:any){
    if(html.length>0){
        startAnalysis(html, word, setcontent)
    }
    else{
        getHTML( url, function (response: any) {
            startAnalysis(response.documentElement.innerHTML, word, setcontent);
        });
    }
}

function startAnalysis(data: any, word: string, setcontent: any){
    if(checkBrand(data)=='hm'){
        HIM(data, word, setcontent)
    }
    else if(checkBrand(data)=='zara'){
        ZARA(data, word, setcontent)
    }
    else{
        RE(data, word, setcontent)
    }    
}


const MyModule: React.FC<IMyModuleProps> =({}) => {
    const [url, seturl] = React.useState('');
    const [html, sethtml] = React.useState('');
    const [word, setword] = React.useState('');
    const [content, setcontent] = React.useState('');
    const [contentwithimg, setcontentwithimg] = React.useState('');
    return (
        <ChangeViewsection>
            <WholeContextdiv>
                <DataViewdiv>
                    {/* <WholeContextdiv>
                        <Brandbuttondiv onClick={()=>setbrand('zara')}>
                            <Analaysisbutton >ZARA</Analaysisbutton>
                        </Brandbuttondiv>
                        <Brandbuttondiv onClick={()=>setbrand('hm')}>
                            <Analaysisbutton >H&M</Analaysisbutton>
                        </Brandbuttondiv>
                        <Brandbuttondiv onClick={()=>setbrand('re')}>
                            <Analaysisbutton >Reserved</Analaysisbutton>
                        </Brandbuttondiv>
                    </WholeContextdiv> */}                    
                    <ContentFlowdiv>
                        <URLlabel>wpisz url:</URLlabel><input onChange={ (e: any) => seturl(e.currentTarget.value) }/>                
                    </ContentFlowdiv>
                    <ContentFlowdiv>
                            <URLlabel>wpisz html:</URLlabel><URLtextarea onChange={ (e: any) => sethtml(e.currentTarget.value) }/>                              
                    </ContentFlowdiv>
                    <ContentFlowdiv>
                        <URLlabel>wpisz słowo:</URLlabel><input onChange={ (e: any) => setword(e.currentTarget.value) }/>                
                    </ContentFlowdiv>
                    <Analaysisbuttondiv onClick={()=>doAnalysisonText(url, html, word, setcontent)}>
                        <Analaysisbutton >Analiza</Analaysisbutton>
                    </Analaysisbuttondiv>
                </DataViewdiv>
                <DataViewdiv>
                    <ContentFlowdiv>
                        <URLlabel>Wynik:</URLlabel>
                        <Contentlabel value={content} onChange={ (e: any) => setcontent(e.currentTarget.value) }/>
                        <Analaysisbuttondiv onClick={()=>ExportToCsv(content)}>
                            <Analaysisbutton >Eksportuj do CSV</Analaysisbutton>
                        </Analaysisbuttondiv>
                    </ContentFlowdiv>
                </DataViewdiv>
            </WholeContextdiv>
        </ChangeViewsection>
    )
    
}

export default MyModule