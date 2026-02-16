import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TableauService } from '../services/tableau.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tableau',
  imports: [CommonModule],
  templateUrl: './tableau.html',
  styleUrl: './tableau.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class Tableau {
  // https://prod-in-a.online.tableau.com/#/site/lovelysaimon-6528126ab1/workbooks/470265/views
  // https://prod-in-a.online.tableau.com/t/lovelysaimon-6528126ab1/views/product_cost/Dashboard1%27
 vizUrl = "https://prod-in-a.online.tableau.com/t/lovelysaimon-6528126ab1/views/product_cost/Dashboard1";
  token: string = '';

  constructor(private tableauService: TableauService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadToken();
  }

  loadToken() {
    this.tableauService.getTableauToken().subscribe({
      next: (response) => {
        this.token = response.token;
        console.log("Token : ",this.token)
         this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Token generation failed", err);
      }
    });
  }

  onFirstInteractive(event: any) {
    console.log("Dashboard loaded successfully");

    // const viz = event.target;

    // // Example preset filter
    // viz.applyFilterAsync("Region", "India", "replace");
  }

  onFilterChanged(event: any) {
    console.log("Filter changed:", event.detail);
  }

}
