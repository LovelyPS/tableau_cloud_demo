import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('vizRef') vizElement!: ElementRef;

currentFilters: any[] = [];

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

    const vizElement = event.target;

  const workbook = vizElement.workbook;
  const activeSheet = workbook.activeSheet;

    // Example preset filter
    activeSheet.applyFilterAsync("Brand Name", ["Contoso"], "replace");
  }

  async onFilterChanged(event: any) {

  const viz = this.vizElement.nativeElement;
  const workbook = viz.workbook;
  const activeSheet = workbook.activeSheet;

  // If dashboard, get filters from all worksheets
  if (activeSheet.sheetType === 'dashboard') {

    const worksheets = activeSheet.worksheets;
    let allFilters: any[] = [];

    for (const sheet of worksheets) {
      const filters = await sheet.getFiltersAsync();
      allFilters = [...allFilters, ...filters];
    }

    this.currentFilters = this.formatFilters(allFilters);

  } else {
    const filters = await activeSheet.getFiltersAsync();
    this.currentFilters = this.formatFilters(filters);
  }

  console.log("All Current Filters:", this.currentFilters);
}

  formatFilters(filters: any[]) {

  return filters.map(f => {

    let values: any[] = [];

    if (f.appliedValues) {
      values = f.appliedValues.map((v: any) => v.value);
    }

    return {
      field: f.fieldName,
      values: values
    };
  });
}

}
