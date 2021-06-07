import { GetcomptesService } from './../../services/comptes/comptes.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppComponent } from "../../app.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { PanierService } from 'src/app/services/Panier/panier.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('sideNavFade', [
      transition('void => *',
        [
          style({ transform: 'translateX(-300px)' })
          , animate('0.5s 0.7s ease-out')
        ]
      )
    ]),
  ]
})
export class SidebarComponent implements OnInit {

  userNameDash = "BOT";
  hideSideBar = false;
  public dsh = false;
  public page2 = false;
  public page3 = false;
  public page4 = false;
  public page5 = false;
  public page6 = false;
  public page7 = false;
  public comptes = false;
  public avatar: any = "";
  public checkImg = false;
  public imgExist = false ; 
  permis:any;

  public currentPanierSize = 0 ; 

  private s: Subscription = new Subscription();//buttons border radius onPageLoad 

  constructor(@Inject(DOCUMENT) private document: Document,
    private router: Router,
    private auth: AuthService,
    private compte: GetcomptesService,
    private appCmp: AppComponent,
    private _snackBar:MatSnackBar,
    private panier : PanierService,public dialog: MatDialog) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd)
        this.dash(val.url.substring(1));
    })
  }

  ngOnInit(): void {
    this.document.body.classList.add('paddingBody');//ajouter le padding au body si le sideBar est ouvert

    //style the buttons if other button is selected 
    this.s = this.router.events.subscribe(val => {
      this.dash(location.pathname.substring(1));
      this.s.unsubscribe();
    });
    this.setImg()
    this.setUsername();


    if (this.router.url == "/dashboard")
      this.dsh = true;
    if (this.router.url == "/comptes")
    this.comptes = true;

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    this.permis = decodedToken["permis"];

    //**************************** */
    //**************************** */
    //**************************** */
    this.panier.panierNbrLigne.subscribe(response => this.currentPanierSize = response);  

    this.getPanierSize() ;
  }

  sideBarToggeleClicked() {
    if (this.hideSideBar == false) {
      this.document.body.classList.add('paddingBody');
      this.document.body.classList.remove('removePaddingBody');
    }
    else {
      this.document.body.classList.add('removePaddingBody');
      this.document.body.classList.remove('paddingBody');
    }
  }

  private checkIfItsDetailCmdPage(current : String ):boolean
  {
    let i :number ; 
    if(current.substr(0,5) == "page2")
      return true ; 
    return false ; 
  }
  private checkIfItsDetailDevis(current : String ):boolean
  {
    let i :number ; 
    if(current.substr(0,5) == "page3")
      return true ; 
    return false ; 
  }
  dash(current: any) {
    //if button is clicked and the JWT localstorage is null then redirect to sign in page
    if (localStorage.getItem("jwt") == null)
      this.logOut();

    if (current == "dashboard") {
      this.dsh = true;
      this.page2 = this.page3 = this.page4 = this.page5 = this.comptes = this.page6 =this.page7  = false;
    }
    if (current == "page2" || this.checkIfItsDetailCmdPage(current)) {
      this.page2 = true;
      this.dsh = this.page3 = this.page4 = this.page5 = this.comptes = this.page6 =this.page7  = false;
    }
    if (current == "page3" || this.checkIfItsDetailDevis(current) ) {
      this.page3 = true;
      this.dsh = this.page2 = this.page4 = this.page5 = this.comptes = this.page6 =this.page7  = false;
    }
    if (current == "page4") {
      this.page4 = true;
      this.dsh = this.page2 = this.page3 = this.page5 = this.comptes = this.page6 =this.page7  = false;
    }
    if (current == "page5") {
      this.page5 = true;
      this.dsh = this.page2 = this.page3 = this.page4 = this.comptes = this.page6 = this.page7  =false;
    }
    if(current == "page6")
    {
      this.page6 = true ;
      this.dsh = this.page2 = this.page3 = this.page4 = this.comptes= this.page5  = this.page7  =false;
    }
    if(current == "page7")
    {
      this.page7 = true ;
      this.dsh = this.page2 = this.page3 = this.page4 = this.comptes= this.page5  = this.page6 = false;
    }
    if (current == "comptes") {
      this.comptes = true;
      this.dsh = this.page2 = this.page3 = this.page4 = this.page5 =this.page6 = this.page7  = false;
    }
  }



  
  inputFunctionValue(image: any) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    const userName = decodedToken["sub"];
    const croppedImage = image;
    this.checkImg = false;// test sur la taille de l'image introuvable

    this.compte.updateImg(croppedImage?.slice(22),userName).subscribe(response => {
      this._snackBar.open(
        "votre photo a été mis a jour", "", {
        verticalPosition: 'top',
        panelClass: 'green-snackbar',
        duration: 2000,
      });
      this.avatar = croppedImage;
      this.imgExist=true ; 
    },(error)=>{
      this.imgExist=false ; 
      this._snackBar.open(
        error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration : 3000
      });
      this.setImg();
    }
    )
     
  }
  setUsername() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    this.userNameDash = decodedToken["sub"];
  }
  setImg() {

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    const id = decodedToken["sub"];
    this.compte.getImg(id).subscribe(Response => {
      
      
      this.imgExist=true ; 
      this.avatar = "data:image/jpg;base64,"+Response
    },(error)=>
    {
      this.imgExist=false ; 
    }
    )

  }

  logOut() {
    setTimeout(() => {
      this.router.navigate(["/login"]);
      //clear the local storage
      this.auth.logout();
    }, 400)

    //delete the padding body class from the body
    this.document.body.classList.remove('paddingBody');
    this.document.body.classList.remove('removePaddingBody');
    //hide the sideNav 
    this.appCmp.showNavSide = false;
  }

  getPanierSize()
  { 
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr = decodedToken["dealerNbr"];
    this.panier.getPanierSize().subscribe((data:any)=>{
      this.panier.setPanierSizeAttr(data);
    });
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CropImageDialog, {
      minWidth: '500px',maxWidth:'1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      //result hiya el image
      if(result)
        this.inputFunctionValue(result);
    });
  }
}

@Component({
  selector: 'cropImageDialog',
  templateUrl: 'cropImageDialog.html',
  styleUrls: ['./cropImageDialogStyle.css'],
})
export class CropImageDialog {

  constructor(
    public dialogRef: MatDialogRef<CropImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private imageCompress: NgxImageCompressService) {}

  

    inputFunction() {
      let bt = <HTMLInputElement>document.getElementById("choseImage");
      bt.click();
    }

    imageChangedEvent: any = '';
    croppedImage: any = '';
    imageVolumineux :any =false ; 

    fileChangeEvent(event: any): void {
      
      if(((event.target.files[0].size)*1.37)<=1000000)
      {
        this.imageVolumineux=false ; 
        this.imageChangedEvent = event;
      }
      else 
        this.imageVolumineux =true ;
    }
    imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.imgResultBeforeCompress=this.croppedImage;
      this.compressFile(); 
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
   
    imgResultBeforeCompress:string='';
    imgResultAfterCompress:string='';
    compressFile() {
    
  
        //this.imgResultBeforeCompress = image;
        console.warn('Size in bytes was:', this.imageCompress.byteCount(this.croppedImage));
        
        this.imageCompress.compressFile(this.croppedImage, 40, 40).then(
          result => {
            this.imgResultAfterCompress = result;
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          }
        );

      console.log(this.imgResultAfterCompress);
      console.log("qdsfhjkdfhjklqdsfkjhqfdskhjlhjkqlfsdhjkl");
    }
}