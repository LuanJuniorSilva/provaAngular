import { Component, OnInit, Directive, Input } from "@angular/core";

import { ApiService } from "../api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {
  ReviewKM,
  monthsReview,
  yearsReview,
  specialVehicle,
  vehicleBrand,
  vehicleModel,
  vehicleVersion,
  uf,
  status
} from "../shared/values-selects";

import {
  typePerson,
  typeSales,
  financialType,
  productType
} from "../shared/values-checks";

import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [ApiService]
})
@Directive({
  selector: "[appModalClose]"
})
export class HomeComponent implements OnInit {
  public lists: any;
  public listsTot: any;
  public idSel: number;

  public ReviewKM = ReviewKM;
  public monthsReview = monthsReview;
  public yearsReview = yearsReview;
  public specialVehicle = specialVehicle;
  public vehicleBrand = vehicleBrand;
  public vehicleModel = vehicleModel;
  public vehicleVersion = vehicleVersion;
  public uf = uf;
  public status = status;

  public typePerson = typePerson;
  public typeSales = typeSales;
  public financialType = financialType;
  public productType = productType;

  public statusControl = new FormControl();

  @Input() public form: FormGroup = new FormGroup({
    typePerson: new FormControl(null),
    typeSales: new FormControl(null),
    financialType: new FormControl(null),
    productType: new FormControl(null),
    vehicleBrand: new FormControl(null),
    vehicleModel: new FormControl(null),
    vehicleVersion: new FormControl(null),
    yearFab: new FormControl(null),
    specialVehicle: new FormControl(null),
    uf: new FormControl(null),
    vigMin: new FormControl(null),
    vigMax: new FormControl(null),
    yearsReview: new FormControl(null),
    monthsReview: new FormControl(null),
    ReviewKM: new FormControl(null)
  });

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.apiService.list().subscribe((res: any) => {
      this.listsTot = res;
      this.showContent(res, true);
    });
  }

  /*
   *  método limpar todos os valores nos campos
   */

  public reset(): void {
    // this.list = null;
    this.form.reset();
  }

  /*
   *  método para setar o id para ser deletado
   */

  public setarId(id: number): void {
    // this.idSelecionado = id;
  }

  public showHide(id) {
    this.idSel = id;
  }

  public deleteItem(id) {
    this.lists.forEach(elem => {
      if (elem.id === id) {
        elem.active = 0;
      }
    });

    this.showContent(this.lists);
  }

  public showContent(res, t = false) {
    this.lists = t
      ? res.content.filter(elem => elem.active == 1)
      : res.filter(elem => elem.active == 1);
  }

  public changeValueStatus(e) {
    if (e.value.length === 2) {
      this.lists = this.listsTot.content;
    } else {
      if (e.value[0] === "active" || e.value.length === 0) {
        this.lists = this.listsTot.content.filter(elem => elem.active == 1);
      } else {
        this.lists = this.listsTot.content.filter(elem => elem.active == 0);
      }
    }
  }

  public filterInputs() {
    // this.lists = this.listsTot.content.filter(elem => {
    //   // console.log(elem)
    // });

    this.apiService.list().subscribe((res: any) => {
      this.listsTot = res;
      this.showContent(res, true);
    });
  }
}
