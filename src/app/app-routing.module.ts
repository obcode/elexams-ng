import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlanComponent } from "./components/plan/plan.component";
import { ExamlistComponent } from "./components/examlist/examlist.component";

const routes: Routes = [
  { path: "", component: PlanComponent },
  { path: "examlist", component: ExamlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
