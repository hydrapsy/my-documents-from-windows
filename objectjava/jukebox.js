function Jukebox(record) {
	this.currentRecord=record;
this.curently playing=function
console.log(this.currentRecord.songDetail();
	this.switchRecord=function(record){
		this.currentRecord=record;
};
this.switchRecord(){
console.log('switchRecord');
};
function Record(){
this.title= title;
this.artist=artist;
this.songDetail=function(){
console.log('You\re listenig to ' + this.title +'by'+ artist+'.');
};
}
var myRecord = new Record('Thriller',Micheal Jackson);
var myOtherrecord=Record('staying alive' ' Bee Gees');
var myRecord= new Jukebox(myRecord);