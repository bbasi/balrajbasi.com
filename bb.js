// balraj basi

let games = {
	'bld' : {
		id  : 'bld',
		ttl : 'Bolder',
		sum : '[rec]',
	},
	'ctn' : {
		id  : 'ctn',
		ttl : 'Catch The Night',
		sum : 'stars; timed, endless, nights',
		and : './games/catch_the_night.apk',
	},
	'hop' : {
		id  : 'hop',
		ttl : 'Hop Shot',
		sum : 'pixel liftoff',
		ios : 'https://itunes.apple.com/ca/app/hop-shot/id1073166647?mt=8'
	},
	'ssm' : {
		id  : 'ssm',
		ttl : 'Sorcerers Summit',
		sum : 'we fly high, no lie',
		web : './games/sorcerers_summit',
		ghb : 'https://github.com/bbasi/sorcerers-summit',
	}
}
let imgs_main = [
	 '/img/balraj.jpg',
	'/gm/ctn/icon.jpg',
	'/gm/bld/icon.jpg',
	'/gm/ssm/icon.jpg',
	'/gm/hop/icon.jpg',
	 '/img/github.jpg',
	'/img/contact.jpg',
	    '/img/cnd.jpg',
	   '/img/basi.jpg'
];

let elem_cntnr_main;
let elem_cntnr_game;
let elem_game_btn_back;
let elem_game_ttl;
let elem_game_sum;
let elem_game_img;
let elem_game_btn_play;
let elem_game_btn_ghub;
let elem_game_vid_prnt;
let elem_game_vid;
let elem_sqrs = [];
let img_cache = [];
let cache_vst = [];

const states = Object.freeze({
	'none':0,
	'main':1,
	'game':2
});
let  state = states.none;
let   inpt = false;
let     hd = false;
let gm_vid =  null;

document.addEventListener('DOMContentLoaded',evt=>{ boot() });

function boot(){
	let gt_elem = e => document.getElementById(e);
	elem_cntnr_main  = gt_elem('cntnr-main');
	elem_cntnr_game  = gt_elem('cntnr-game');
	let sqr_bal      = gt_elem('sqr-bal');
	let sqr_ctn      = gt_elem('sqr-ctn');
	let sqr_bld      = gt_elem('sqr-bld');
	let sqr_ssm      = gt_elem('sqr-ssm');
	let sqr_hop      = gt_elem('sqr-hop');
	let sqr_ghb      = gt_elem('sqr-ghb');
	let sqr_cnt      = gt_elem('sqr-cnt');
	let sqr_cnd      = gt_elem('sqr-cnd');
	let sqr_bas      = gt_elem('sqr-bas');
  sqr_ctn.onclick = ()=> {if(inpt) to_game(games['ctn'])};
	sqr_bld.onclick = ()=> {if(inpt) to_game(games['bld'])};
	sqr_hop.onclick = ()=> {if(inpt) to_game(games['hop'])};
	sqr_ssm.onclick = ()=> {if(inpt) to_game(games['ssm'])};
	let url_ghb = 'https://github.com/bbasi';
	let url_cnt = 'mailto:contact@balrajbasi.com?subject=subject=Hi%20Balraj';
	sqr_ghb.onclick = ()=> {if(inpt) to_ext_url(sqr_ghb,url_ghb)};
	sqr_cnt.onclick = ()=> {if(inpt) to_ext_url(sqr_cnt,url_cnt)};
	elem_sqrs = [sqr_bal,sqr_ctn,sqr_bld,sqr_ssm,sqr_hop,sqr_ghb,sqr_cnt,sqr_cnd,sqr_bas];

	elem_game_btn_back = gt_elem('game-btn-back'); elem_game_btn_back.style.opacity = 0;
	elem_game_btn_play = gt_elem('game-btn-play'); elem_game_btn_play.style.opacity = 0;
	elem_game_btn_ghub = gt_elem('game-btn-ghub'); elem_game_btn_ghub.style.opacity = 0;
	elem_game_ttl      = gt_elem('game-ttl');           elem_game_ttl.style.opacity = 0;
	elem_game_sum      = gt_elem('game-sum');           elem_game_sum.style.opacity = 0;
	elem_game_img      = gt_elem('game-img');           elem_game_img.style.opacity = 0;
	elem_game_vid_prnt = gt_elem('game-vid-prnt');
	elem_game_btn_back.onclick = ()=>{ if(inpt) to_main() };

	    hd = (screen.height >= 1024 && screen.width >= 768);
	gm_vid = init_game_vid(elem_game_vid_prnt);
	
	let dly_ini = 1500;
	let tme_str = Date.now();

	prld_imgs( gt_imgs_sqrs(), ()=>{
		function crt_sqr_img(prnt,url){
			let e_img = document.createElement('img');
			e_img.src = url;
			prnt.appendChild(e_img);
		}
		crt_sqr_img(sqr_bal, gt_img_sqr('bal'));
		crt_sqr_img(sqr_ctn, gt_img_sqr('ctn',true));
		crt_sqr_img(sqr_bld, gt_img_sqr('bld',true));
		crt_sqr_img(sqr_ssm, gt_img_sqr('ssm',true));
		crt_sqr_img(sqr_hop, gt_img_sqr('hop',true));
		crt_sqr_img(sqr_ghb, gt_img_sqr('ghb'));
		crt_sqr_img(sqr_cnt, gt_img_sqr('cnt'));
		crt_sqr_img(sqr_cnd, gt_img_sqr('cnd'));
		crt_sqr_img(sqr_bas, gt_img_sqr('bas'));

		let dur = Date.now() - tme_str;
		let dly = (dur < dly_ini) ? (dly_ini - dur) : 0;
		gm_vid.prld_first();
		dlyd(dly, ()=>{ to_main() });
	});
}

function prld_imgs(urls,cb){
	let ldd = 0;
	for(let i=0; i<urls.length; i++)
	 prld_img(urls[i],()=>{ ldd++; if(ldd === urls.length) cb(); });
}
function prld_img(url,cb){
	let img    = new Image();
	img.src    = url;
	img.onload = cb;
	img_cache.push(img);
}
function prld_vid(url,cb){
	let req = new XMLHttpRequest();
	req.onload = ()=>{
		img_cache.push(URL.createObjectURL(req.response));
		if(cb) cb();
	}
	req.open('GET',url);
	req.responseType = 'blob';
	req.send();
}

function gt_imgs_sqrs(){
	return [
		gt_img_sqr('bal'),
		gt_img_sqr('ctn',true),
		gt_img_sqr('bld',true),
		gt_img_sqr('ssm',true),
		gt_img_sqr('hop',true),
		gt_img_sqr('ghb'),
		gt_img_sqr('cnt'),
		gt_img_sqr('cnd'),
		gt_img_sqr('bas'),
	];
}
function gt_img_sqr(id,is_gm=false){
	let res = hd ? '1024' : '350';
	if(is_gm) return `/gm/${id}/icon_${res}.jpg`;
						return     `/img/${id}_${res}.jpg`;
}

function to_main(){
	inpt = false;
	if(state == states.none){ st_cntnr('main'); fade_in_main(true); }
	if(state == states.game){
		fade_ot_game(()=>{
			st_cntnr('main');
			window.scrollTo({top:0,left:0,behavior: 'smooth'});
			fade_in_main();
		});
	}
	state = states.main;
}

function to_game(gm){
	inpt = false;
	let frst = !cache_vst.includes(gm.id);
	 if(frst) cache_vst.push(gm.id);
	fade_ot_main(gm.id,()=>{
		fade_in_game(gm,frst,()=>{inpt=true})
	});
	state = states.game;
}

function st_cntnr(cntnr){
	elem_cntnr_game.style.display = cntnr === 'game' ? 'block' : 'none';
	elem_cntnr_main.style.display = cntnr === 'main' ? 'block' : 'none';
	elem_cntnr_game.style.opacity = cntnr === 'game' ? 1 : 0;
	elem_cntnr_main.style.opacity = cntnr === 'main' ? 1 : 0;
}

function fade_in_main(frst=false){
	let sqrs = [...elem_sqrs];
	if(frst){
		let bb = [sqrs.shift(),sqrs.pop()];
		dlyd(1800, ()=>{
			fade_in(bb[0], 400,    0);
			fade_in(bb[1], 400, 1000);
		});
	}
	sqrs = shuffle(sqrs.slice()); 
	let min = frst ? 1200 : 400;
	let max = frst ? 1500 : 800;
	for(let i=0; i<sqrs.length; i++){
		let dur = gt_rnd_100(min,max);
		let dly = (max - dur) + 200;
		fade_in(sqrs[i], dur, dly);
	}
	dlyd(frst ? (3500) : max + 300, ()=>{inpt=true});
}

function fade_ot_main(id, cb){
	let sqrs = [...elem_sqrs];
	let sqr  = sqrs.find( nd => nd.id == `sqr-${id}`);
	sqrs.splice(sqrs.indexOf(sqr),1);
	fade_ot(sqr, 300);
	sqrs.forEach((sqr)=>{
		let dur = gt_rnd_100(200,500);
		let dly = 800 - dur;
		fade_ot(sqr,dur,dly);
	});
	dlyd(800 + 100, cb);
}

function fade_in_game(gm,frst,cb){
	st_cntnr('game');
	elem_game_ttl.textContent = gm.ttl;
	elem_game_sum.textContent = gm.sum;
	elem_game_img.src         = gt_img_sqr(gm.id,true);
	gm_vid.st_gm(gm.id,frst);

	function st_btn(btn,url){
		btn.style.display = url ? 'block' : 'none';
		btn.onclick = ()=>{ if(inpt) to_ext_url(btn,(url)) };
	}
	st_btn(elem_game_btn_ghub, gm.ghb ? gm.ghb : null);
	if      (gm.ios) st_btn(elem_game_btn_play, gm.ios);
	else if (gm.web) st_btn(elem_game_btn_play, gm.web);
	else if (gm.and) st_btn(elem_game_btn_play, gm.and);
	else             st_btn(elem_game_btn_play, null  );

	let dur = 500;
	fade_in(elem_game_img     , dur, 100);
	fade_in(elem_game_ttl     , dur, 100);
	fade_in(elem_game_sum     , dur, 100);
	fade_in(elem_game_btn_back, dur, 700);
	gm_vid.fd_in(dur,1000);
	if(gm.ios || gm.web || gm.and)  fade_in(elem_game_btn_play, dur, 500);
	if(gm.ghb)            fade_in(elem_game_btn_ghub, dur, 700);

	dlyd(1200            , ()=>{ gm_vid.strt() });
	dlyd(1200 + dur + 250, ()=>{          cb() });
}

function fade_ot_game(cb){
	gm_vid.stop();
	let dur = 300;
	fade_ot(elem_game_btn_back, dur, 100);
	fade_ot(elem_game_img     , dur, 200);
	fade_ot(elem_game_ttl     , dur, 200);
	fade_ot(elem_game_sum     , dur, 200);
	gm_vid.fd_ot(dur,500);

	if(elem_game_btn_play.style.opacity != 0) fade_ot(elem_game_btn_play, dur,  300);
	if(elem_game_btn_ghub.style.opacity != 0) fade_ot(elem_game_btn_ghub, dur,  300);
	
	dlyd(500 + dur + 250, ()=>{
		elem_game_btn_play.onclick = null;
		elem_game_btn_ghub.onclick = null;
		cb();
	});
}

function dlyd(dly,fnc,cb=null){
	setTimeout(()=>{
		fnc();
		if(cb)cb();
	},dly);
}

function fade_in(elem,dur=800,dly=0){
	let clss = ['animated','fadeIn',`dur-${dur}`];
	if(dly != 0 ) clss.push(`dly-${dly}`);
	elem.classList.add(...clss);
	function cb_anim_fin(){
		elem.classList.remove(...clss);
		elem.removeEventListener('animationend',cb_anim_fin);
		elem.style.opacity = 1;
	}
	elem.addEventListener('animationend',cb_anim_fin)
}
function fade_ot(elem,dur=800,dly=0){
	let clss = ['animated','fadeOut',`dur-${dur}`];
	if(dly != 0 ) clss.push(`dly-${dly}`);
	elem.classList.add(...clss);
	function cb_anim_fin(){
		elem.style.opacity = 0;
		elem.classList.remove(...clss);
		elem.removeEventListener('animationend',cb_anim_fin);
	}
	elem.addEventListener('animationend',cb_anim_fin)	 
}

function gt_rnd(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function gt_rnd_100(min,max){
	return Math.round((Math.random() * (max - min) + min) / 100) * 100;
}

function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
	}
	return a;
}

function to_ext_url(elem_btn,url){
	inpt = false;
	let clss = ['animated','fade_in_ot_btn'];
	elem_btn.classList.add(...clss);
	function cb_anim_fin(){
		elem_btn.classList.remove(...clss);
		elem_btn.removeEventListener('animationend',cb_anim_fin);
		elem_btn.style.opacity = 1;
		inpt = true;
	}
	elem_btn.addEventListener('animationend', cb_anim_fin)
	// dlyd, attempt in cb_anim_fin -> 'popup blocked'
	dlyd(750, ()=>{window.open(url)});
}


function init_game_vid(prnt){
	function gt_vid_ext(){
		let e = document.createElement('video');
		let mp4  = !!(e.canPlayType && e.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/,''));
		let webm = !!(e.canPlayType && e.canPlayType('video/webm; codecs="vp8, vorbis"')          .replace(/no/,''));

		let usr_agnt = navigator.userAgent || navigator.vendor || window.opera;
		if(/iPad|iPhone|iPod/.test(usr_agnt) && !window.MSStream)
		 return '.jpg';

		if(mp4)  return 'mp4';
		if(webm) return 'webm';
		return 'jpg';
	}
	let ext = gt_vid_ext();
	if(ext == 'mp4' || ext == 'webm')
		return new Game_Vid_HTML5(prnt,ext);
	return new Game_Vid_Basic(prnt);
}

function gt_src_gm_vid(id,ext,idx){
	let res = hd ? '720' : '350';
	return `/gm/${id}/0${idx}_${res}.${ext}`;
}
function gt_src_gm_img(id,idx){
	let res = hd ? '1024' : '512';
	return `/gm/${id}/img/0${idx}_${res}.jpg`;
}

class Game_Vid {
	constructor(prnt,ext){
		this.prnt     = prnt;
		this.elem     = null;//vid|img
		this.ext      = ext;
		this.cb_fin   = null;
		this.id_gm    = '';
		this.idx_pres = -1;
		this.live     = false;
		this.prnt.style.opacity = 0;
	}
	fd_in(dur,dly){
		this.elem.style.opacity = 1;
		fade_in(this.prnt,dur,dly);
	}
	fd_ot(dur,dly){
		fade_ot(this.prnt,dur,dly);
		dlyd(dur+dly,()=>{
			this.elem.style.opacity = 0;
		});
	}
	st_gm(id,frst){
		if(frst) this.prld_scndry(id);
		this.idx_pres = -1;
		this.id_gm    = id;
	}
	gt_idx_pres(){
		this.idx_pres++;
		if(this.idx_pres == 3) this.idx_pres = 0;
		return this.idx_pres;
	}
	strt(){
		this.live = true;
	}
	stop(){
		this.live = false;
	}
// prld_first(){}
// prld_scndry(id){}
}

class Game_Vid_HTML5 extends Game_Vid {
	constructor(prnt,ext){
		super(prnt,ext);
		let e_vid = document.createElement('video');
		e_vid.setAttribute('id','game-vid');
		e_vid.setAttribute('type',`video/${ext}`);
		e_vid.style.opacity = 0;
		prnt.appendChild(e_vid);
		this.elem = e_vid;

		this.cb_fin = ()=>{
			fade_ot(this.elem, 500);
			dlyd( 600, ()=>{
				this.elem.src = gt_src_gm_vid(this.id_gm,this.ext,super.gt_idx_pres());
			});
			dlyd(2000, ()=>{
				if(this.live){
					this.elem.play();
					fade_in(this.elem, 500);
				}
			});
		};
	}
	st_gm(id,frst){
		super.st_gm(id,frst);
		this.elem.src = gt_src_gm_vid(id,this.ext,super.gt_idx_pres());
	}
	strt(){
		super.strt();
		this.elem.addEventListener   ('ended',this.cb_fin);
		this.elem.play();
	}
	stop(){
		super.stop();
		this.elem.removeEventListener('ended',this.cb_fin);
		this.elem.pause();
	}
	prld_first(){
		for (let key in games) prld_vid(gt_src_gm_vid(key,this.ext,0));
	}
	prld_scndry(id){
		prld_vid(gt_src_gm_vid(id,this.ext,1),()=>{
			prld_vid(gt_src_gm_vid(id,this.ext,2));
		});
	}
}

class Game_Vid_Basic extends Game_Vid {
	constructor(prnt){
		super(prnt,'jpg');
		let e_img = document.createElement('img');
		e_img.setAttribute('id', 'game-vid-basic');
		e_img.src = '/img/balraj.jpg';
		e_img.style.opacity = 0;
		prnt.appendChild(e_img);
		this.elem = e_img;
		this.tmr  = null;

		this.cb_fin = ()=>{
			fade_ot(this.elem, 500);
			dlyd( 600,()=>{
				this.elem.src = gt_src_gm_img(this.id_gm,super.gt_idx_pres());
			});
			dlyd(1500,()=>{
				if(this.live)
					fade_in(this.elem, 500);
			});
		};
	}
	st_gm(id,frst){
		super.st_gm(id,frst);
		this.elem.src = gt_src_gm_img(id,super.gt_idx_pres());
	}
	strt(){
		super.strt();
		this.tmr = setInterval(()=>{
			this.cb_fin();
		}, 4500);	
	}
	stop(){
		super.stop();
		clearInterval(this.tmr);
		this.tmr = null;
	}
	prld_first(){
		for (let key in games) prld_img(gt_src_gm_img(key,0));
	}
	prld_scndry(id){
		prld_img(gt_src_gm_img(id,1));
		prld_img(gt_src_gm_img(id,2));
	}
}