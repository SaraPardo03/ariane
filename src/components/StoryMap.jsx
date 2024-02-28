import { dia, shapes } from "@joint/core";
import { useEffect, useRef, useState } from "react";



function StoryMap(props) {
	const storyMapContainer = useRef(null);
	const canvas = useRef(null);
	const paper = useRef(null);
	const [zoomLevel, setZoomLevel] = useState(1);
	const [directionXY, setDirectionXY] = useState([0, 0]);

	const handleZoomIn = () => {
      setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
      setZoomLevel(Math.max(0.1, zoomLevel - 0.1));
  };

  const handleMove = (direction) => {
	  const step = 50; // Adjust step size as needed
	  let dx = 0, dy = 0;
	  switch (direction) {
	      case 'up':
	          dy = -step;
	          break;
	      case 'down':
	          dy = step;
	          break;
	      case 'left':
	          dx = -step;
	          break;
	      case 'right':
	          dx = step;
	          break;
	      default:
	          break;
	  }
	  dx += directionXY[0];
	  dy += directionXY[1]
	  setDirectionXY([dx, dy]);	  

	}
	useEffect(() => {
		// Initialize the graph and paper
		const graph = new dia.Graph({}, { cellNamespace: shapes });
		const paper = new dia.Paper({
      el: document.querySelector("#canvas"),
      model: graph,
      width: storyMapContainer.current.offsetWidth,
      height: storyMapContainer.current.offsetHeight,
      gridSize: 10,
      drawGrid: true,
      draggable: false,
      interactive: function(cellView, method) {
		    return false // Only allow interaction with joint.dia.LinkView instances.
		  },
      background: {
          color: 'rgb(240, 241, 242)'
      },
    });
    // Event handler for double click on elements
    paper.on('element:pointerdblclick', function(elementView) {
		  let element = elementView.model;
  		let elementId = element.attr('id');
  		props.setCurrentePageId(elementId);
		});

    paper.scale(zoomLevel, zoomLevel);
    paper.translate(directionXY[0] , directionXY[1]);
    canvas.current.appendChild(paper.el);

   /**
		 * Draws a page element on the canvas.
		 * @param {Object} page - The page object to be drawn.
		 * @param {number} index - The index of the page.
		 * @param {number} x - The x-coordinate of the page.
		 * @param {number} y - The y-coordinate of the page.
		*/
    const drawPage = (page, index, x, y)=>{
    	const nextPages = props.pages.filter(thispage => thispage.previousPageId === page.id);
    	let color = 'white';
    	if(nextPages.length === 0){
    		color = "rgba(255, 193, 7, 0.5)";
    	}
	    let rect = new shapes.standard.Rectangle();
	    rect.position(x, y + 100);
	    rect.resize(100, 40);
	    rect.attr({
	      body: {
	        fill: color,
	        strokeWidth: 0.5
	      },
	      label: {
	        text: page.title,
	        fill: 'black',
	        fontSize: 11
	      }
	    });
	    rect.attr('id', page.id);
	    rect.addTo(graph);
    };


		/**
		 * Draws a link between two pages.
		 * @param {Object} page - The page object.
		 * @param {number} index - The index of the link.
		 */
    const drawLink =(page, index)=>{
    	let previousElement = graph.getElements().find(element => element.attributes.attrs.id === page.previousPageId);
    	let currenteElement = graph.getElements().find(element => element.attributes.attrs.id === page.id);
    	// Calculate coordinates for the link
    	let startX = previousElement.attributes.position.x + previousElement.attributes.size.width / 2;
			let startY = previousElement.attributes.position.y + previousElement.attributes.size.height;
			let endX = currenteElement.attributes.position.x + currenteElement.attributes.size.width / 2;
			let endY = currenteElement.attributes.position.y;
			
			// Calculate midpoints for the link
			let midX1 = startX;
			let midY1 = startY + 10 + ((index % 3) * 10);
			//let midY1 = startY + 10 +(index*10);
			let midX2 = endX;
			let midY2 = midY1
			let midX3 = endX;
			let midY3 = endY - (10 + ((index % 3) * 10));
			//let midY3 = endY - (10 + (index*10));

			// Colors array for links
			const colors = [
			  "rgba(0, 123, 255, 0.5)", // primary
			  "rgba(108, 117, 125, 0.5)", // secondary
			  "rgba(40, 167, 69, 0.5)", // success
			  "rgba(23, 162, 184, 0.5)", // info
			  "rgba(255, 193, 7, 0.5)", // warning
			  "rgba(220, 53, 69, 0.5)", // danger
			  //"rgba(248, 249, 250, 0.5)", // light
			  "rgba(52, 58, 64, 0.5)" // dark
			];
	    let link = new shapes.standard.Link({
			  source: { x: startX, y: startY },
	  		target: { x: endX, y: endY },
	  		vertices: [{ x: midX1, y: midY1 }, { x: midX2, y: midY2 }, { x: midX3, y: midY3 }]
			});
			// Apply color to the link
			if(index > 0){
				link.attr({
			    line: {
			        stroke: colors[index]
			    }
				});
			}
			
			graph.addCell(link);
    };

    /**
		 * Draws the next row of pages recursively.
		 * @param {Object[]} previousPages - The array of previous pages.
		 * @param {number} x - The x-coordinate of the starting point.
		 * @param {number} y - The y-coordinate of the starting point.
		*/
   	const drawNextRow = (previousPages, x, y) => {
   		if(previousPages){
   			const previousPagesIds = previousPages?.map(page => page.id);
   			const currentPages = props.pages.filter(page => previousPagesIds.includes(page.previousPageId));
   			const nbCurrentePages = currentPages.length;
   			let middleCurrentPageIndex = Math.floor(nbCurrentePages / 2);

   			if(currentPages.length > 0){
   				currentPages.forEach((page, index) => {
   					let newX;
   					if (index < middleCurrentPageIndex) {
				      newX = x - (middleCurrentPageIndex - index) * 180;
				    } else if (index === middleCurrentPageIndex) {
				      newX = x;
				    } else {
				      newX = x + (index - middleCurrentPageIndex) * 180;
				    }
   					drawPage(page, index, newX, y);
   					drawLink(page, index);
   				});
   				drawNextRow(currentPages, x, y + 160);
   			}
   		}
   	};

   	const firstPages = props.pages.filter(page => page.first);
    //const firstPage = props.pages.find(page => page.first);
	  if (firstPages.length > 0) {
	    let firstPageElement = new shapes.standard.Rectangle();
	    firstPageElement.position(paper.options.width / 2 - 50, 10);
	    firstPageElement.resize(100, 40);
	    firstPageElement.attr({
	      body: {
	        fill: "rgba(0, 123, 255, 0.5)",
	        strokeWidth: 0.5
	      },
	      label: {
	        text: firstPages[0].title,
	        fill: 'black',
	        fontSize: 11
	      }
	    });
	    firstPageElement.attr('id', firstPages[0].id);
	    firstPageElement.addTo(graph);

	    drawNextRow(firstPages, paper.options.width / 2 - 50, 10, 10);
	  }
    return () => {
      paper.remove();
    };
  }, [props.pages, zoomLevel, directionXY]);

	return	<div className="col d-none d-xl-block story-map" ref={storyMapContainer}>
    	<div className="canvas story-map-canvas" ref={canvas}></div>
    	<div>
    		<div className="buttons-container"> 
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
            <button onClick={() => handleMove('up')}>Up</button>
            <button onClick={() => handleMove('down')}>Down</button>
            <button onClick={() => handleMove('left')}>Left</button>
            <button onClick={() => handleMove('right')}>Right</button>
        </div>
      </div>
    </div>
}

export default StoryMap;
