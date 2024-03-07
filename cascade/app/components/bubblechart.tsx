"use client";

import { FC, useEffect, useRef, RefObject } from 'react';
import * as d3 from 'd3';

const BubbleChart: FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const data = [
        { label: 'AA', value: 40 },
        { label: 'A', value: 30 },
        { label: 'B', value: 25 },
        { label: 'C', value: 20 },
        { label: 'D', value: 15 },
        { label: 'E', value: 10 },
        { label: 'HR', value: 5 }
    ];


    function draw(svgRef: RefObject<SVGSVGElement>) {
            const width = 400;
            const height = 400;

            const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

            const pack = d3.pack()
            .size([width, height])
            .padding(5);

            const root = d3.hierarchy({children: data})
            .sum((d: any) => d.value);

            const bubbles = pack(root).leaves();

            svg.selectAll("circle")
            .data(bubbles)
            .enter()
            .append("circle")
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y)
            .attr("r", (d: any) => d.r)
            .attr("class", "bubble")
            .attr("fill", "white")
            .attr("stroke", "#0891b2")
            .attr("stroke-width", 2);

            svg.selectAll("text")
                .data(bubbles)
                .enter()
                .append("text")
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y)
                .attr("dy", "0.35em")
                .text((d: any) => d.data.label)
                .attr("class", "bubble-label")
                .style("pointer-events", "none")
                .attr("fill", "#0891b2")
                .attr("font-size", "18px")
                .attr("text-anchor", "middle")
                .style("pointer-events", "none");
    }

    useEffect(() => {
        draw(svgRef);
        }, [svgRef])

    return <svg ref={svgRef}></svg>;
};

export default BubbleChart;
