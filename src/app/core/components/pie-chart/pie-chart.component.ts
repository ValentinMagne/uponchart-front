import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ScaleOrdinal } from "d3";
import { PieChartModel } from "../../models/pie-chart.model";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() chartData!: PieChartModel[];
  private svg: any;
  private margin = 50;
  private width = 500;
  private height = 500;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors!: ScaleOrdinal<string, unknown>

  public ngOnInit(): void {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox', (-this.width / 2) + ' ' + (-this.height / 2) + ' ' + this.width + ' ' + this.height)
      .attr('preserveAspectRatio', 'xMinYMin');
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.chartData.map(d => d.value.toString()))
      .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.value));

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.chartData))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.chartData))
      .enter()
      .append('text')
      .text((d: any) => d.data.label)
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }
}
