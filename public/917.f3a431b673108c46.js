"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[917],{2917:(M,u,n)=>{n.r(u),n.d(u,{AuthSignInModule:()=>Y});var m=n(9132),d=n(4859),v=n(6709),l=n(9549),f=n(7392),p=n(4144),h=n(1572),x=n(6236),I=n(7775),y=n(2261),s=n(4006),Z=n(8288),t=n(4650),A=n(8951),w=n(2494),T=n(6895);const U=["signInNgForm"];function C(e,i){if(1&e&&(t.TgZ(0,"fuse-alert",39),t._uU(1),t.qZA()),2&e){const o=t.oxw();t.Q6J("appearance","outline")("showIcon",!1)("type",o.alert.type)("@shake","error"===o.alert.type),t.xp6(1),t.hij(" ",o.alert.message," ")}}function S(e,i){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," El usuario es requerido "),t.qZA())}function b(e,i){1&e&&t._UZ(0,"mat-icon",40),2&e&&t.Q6J("svgIcon","heroicons_solid:eye")}function F(e,i){1&e&&t._UZ(0,"mat-icon",40),2&e&&t.Q6J("svgIcon","heroicons_solid:eye-off")}function J(e,i){1&e&&(t.TgZ(0,"span"),t._uU(1," Ingresar "),t.qZA())}function N(e,i){1&e&&t._UZ(0,"mat-progress-spinner",41),2&e&&t.Q6J("diameter",24)("mode","indeterminate")}const Q=function(){return["/forgot-password"]},j=[{path:"",component:(()=>{class e{constructor(o,r,a,g){this._activatedRoute=o,this._authService=r,this._formBuilder=a,this._router=g,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this.signInForm=this._formBuilder.group({username:["",[s.kI.required]],password:["",s.kI.required]})}signIn(){this.signInForm.invalid||(this.signInForm.disable(),this.showAlert=!1,this._authService.signIn(this.signInForm.value).subscribe({next:o=>{this._router.navigateByUrl("acceso")},error:({error:o})=>{this.signInForm.enable(),this.signInNgForm.resetForm(),this.alert={type:"error",message:o.message},this.showAlert=!0}}))}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(m.gz),t.Y36(A.e),t.Y36(s.QS),t.Y36(m.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["auth-sign-in"]],viewQuery:function(o,r){if(1&o&&t.Gf(U,5),2&o){let a;t.iGM(a=t.CRH())&&(r.signInNgForm=a.first)}},decls:58,vars:13,consts:[[1,"flex","flex-col","sm:flex-row","items-center","md:items-start","sm:justify-center","md:justify-start","flex-auto","min-w-0"],[1,"md:flex","md:items-center","md:justify-end","w-full","sm:w-auto","md:h-full","md:w-1/2","py-8","px-4","sm:p-12","md:p-16","sm:rounded-2xl","md:rounded-none","sm:shadow","md:shadow-none","sm:bg-card"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-15"],["src","assets/images/logo/gcpron.png"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight"],["class","mt-8 -mb-4",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8",3,"formGroup"],["signInNgForm","ngForm"],[1,"w-full"],["matInput","",3,"formControlName"],[4,"ngIf"],["id","password","matInput","","type","password",3,"formControlName"],["passwordField",""],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],[1,"inline-flex","items-end","justify-between","w-full","mt-1.5"],[1,"text-md","font-medium","text-primary-500","hover:underline",3,"routerLink"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","mt-6",3,"color","disabled","click"],[3,"diameter","mode",4,"ngIf"],[1,"relative","hidden","md:flex","flex-auto","items-center","justify-center","w-1/2","h-full","p-16","lg:px-28","overflow-hidden","bg-gray-800","dark:border-l"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"absolute","inset-0","pointer-events-none"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],["viewBox","0 0 220 192","width","220","height","192","fill","none",1,"absolute","-top-16","-right-16","text-gray-700"],["id","837c3e70-6c3a-44e6-8854-cc48c737b659","x","0","y","0","width","20","height","20","patternUnits","userSpaceOnUse"],["x","0","y","0","width","4","height","4","fill","currentColor"],["width","220","height","192","fill","url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"],[1,"z-10","relative","w-full","max-w-2xl"],[1,"text-7xl","font-bold","leading-none","text-gray-100"],[1,"mt-6","text-lg","tracking-tight","leading-6","text-gray-400"],[1,"flex","items-center","mt-8"],[1,"flex","flex-0","items-center","-space-x-1.5"],["src","assets/images/logo/socofar.png",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/logo/klap.png",1,"bg-white","flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/logo/cruz_verde.jpeg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],["src","assets/images/logo/gcp.jpg",1,"flex-0","w-10","h-10","rounded-full","ring-4","ring-offset-1","ring-gray-800","ring-offset-gray-800","object-cover"],[1,"ml-4","font-medium","tracking-tight","text-gray-400"],[1,"mt-8","-mb-4",3,"appearance","showIcon","type"],[1,"icon-size-5",3,"svgIcon"],[3,"diameter","mode"]],template:function(o,r){if(1&o){const a=t.EpF();t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t._UZ(4,"img",4),t.qZA(),t.TgZ(5,"div",5),t._uU(6,"Ingresar"),t.qZA(),t.YNc(7,C,2,5,"fuse-alert",6),t.TgZ(8,"form",7,8)(10,"mat-form-field",9)(11,"mat-label"),t._uU(12,"Usuario"),t.qZA(),t._UZ(13,"input",10),t.YNc(14,S,2,0,"mat-error",11),t.qZA(),t.TgZ(15,"mat-form-field",9)(16,"mat-label"),t._uU(17,"Password"),t.qZA(),t._UZ(18,"input",12,13),t.TgZ(20,"button",14),t.NdJ("click",function(){t.CHM(a);const c=t.MAs(19);return t.KtG(c.type="password"===c.type?"text":"password")}),t.YNc(21,b,1,1,"mat-icon",15),t.YNc(22,F,1,1,"mat-icon",15),t.qZA(),t.TgZ(23,"mat-error"),t._uU(24," La contrase\xf1a es requerida "),t.qZA()(),t.TgZ(25,"div",16),t._UZ(26,"div"),t.TgZ(27,"a",17),t._uU(28,"Olvido su contrase\xf1a? "),t.qZA()(),t.TgZ(29,"button",18),t.NdJ("click",function(){return r.signIn()}),t.YNc(30,J,2,0,"span",11),t.YNc(31,N,1,2,"mat-progress-spinner",19),t.qZA()()()(),t.TgZ(32,"div",20),t.O4$(),t.TgZ(33,"svg",21)(34,"g",22),t._UZ(35,"circle",23)(36,"circle",24),t.qZA()(),t.TgZ(37,"svg",25)(38,"defs")(39,"pattern",26),t._UZ(40,"rect",27),t.qZA()(),t._UZ(41,"rect",28),t.qZA(),t.kcU(),t.TgZ(42,"div",29)(43,"div",30)(44,"div"),t._uU(45,"Bienvenido a"),t.qZA(),t.TgZ(46,"div"),t._uU(47,"contabilidad online "),t.qZA()(),t.TgZ(48,"div",31),t._uU(49," Tu plataforma de gesti\xf3n y recaudacion , confiable y efectiva "),t.qZA(),t.TgZ(50,"div",32)(51,"div",33),t._UZ(52,"img",34)(53,"img",35)(54,"img",36)(55,"img",37),t.qZA(),t.TgZ(56,"div",38),t._uU(57,"Empresas asociadas"),t.qZA()()()()()}if(2&o){const a=t.MAs(19);t.xp6(7),t.Q6J("ngIf",r.showAlert),t.xp6(1),t.Q6J("formGroup",r.signInForm),t.xp6(5),t.Q6J("formControlName","username"),t.xp6(1),t.Q6J("ngIf",r.signInForm.get("username").hasError("required")),t.xp6(4),t.Q6J("formControlName","password"),t.xp6(3),t.Q6J("ngIf","password"===a.type),t.xp6(1),t.Q6J("ngIf","text"===a.type),t.xp6(5),t.Q6J("routerLink",t.DdM(12,Q)),t.xp6(2),t.Q6J("color","primary")("disabled",r.signInForm.disabled),t.xp6(1),t.Q6J("ngIf",!r.signInForm.disabled),t.xp6(1),t.Q6J("ngIf",r.signInForm.disabled)}},dependencies:[m.yS,d.lW,l.TO,l.KE,l.hX,l.R9,f.Hw,p.Nt,h.Ou,w.W,T.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u],encapsulation:2,data:{animation:Z.L}}),e})()}];let Y=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[m.Bz.forChild(j),d.ot,v.p9,l.lN,f.Ps,p.c,h.Cq,x.J,I.fC,y.m]}),e})()}}]);