window.addEventListener("load", function(e){

	// extract all tags:
	let tags = data.map(function(obj, item){
		return obj.tags;
	});

	// flatten the array:
	tags = flatten(tags);
	
	// get unique elements:
	tags = tags.filter(function(value, index, self){
		return self.indexOf(value) === index;
	});

	// sort array:
	tags.sort();

	// render tags:
	const el_tags = document.querySelector(".tags");


	tags.forEach(function(el){		
		const li = document.createElement("li");
		li.innerHTML = el;
		li.classList.add("button-tag");
		li.classList.add("rese");
		li.dataset.tag = el;
		li.dataset.active = false;
		el_tags.appendChild(li);
		li.addEventListener('click', function(event){
			const t = event.target;	
			const btns = document.querySelectorAll(".button-tag");
			const projects = document.querySelectorAll(".sketch");
			if (t.dataset.active == 'false') {	
				// filtro attivato	
				for (btn of btns) {
					btn.dataset.active = false;
					btn.classList.add("disabled");
				}		
				t.dataset.active = true;			
				t.classList.remove("disabled");
			
				for (prj of projects) {
					if (prj.classList.contains("tag-" + t.dataset.tag)) {
						prj.classList.remove("disabled");
					} else {
						prj.classList.add("disabled");
					}
				}
			} else {
				for (btn of btns) {
					btn.classList.remove("disabled");
					btn.dataset.active = false;
				}	
				for (prj of projects) {
					prj.classList.remove("disabled");
				}					
			}
		});
	});

	// render sketches:
	const el_sketches = document.querySelector(".sketches");

	data.forEach(function(el){		
		const holder = document.createElement("div");
		holder.classList.add("sketch");
		holder.style.backgroundImage = 'url(' + el.img_url_abs + ')';
		el.tags.forEach(function(tag){
			holder.classList.add("tag-" + tag);
		})
		let html = "";
		html += "<div class='descrizione margine'>";
		html += "<p class='stile'>"+el.titolo+"</p>";
		html += "<p class='reveal stile'>"+el.data+"</p>";
		html += "<p class='reveal stile'>"+el.desc+"</p>";
		html += "<p class='reveal stile'>";
		for (t of el.tags) {
			html += "#" + t + " ";
 		}
		html +="</p>";
		html += "<p class='reveal stile'><a target='_blank' href='"+el.url+"'>GitHub</a></p>";
		html += "</div>";

		holder.innerHTML = html;
		el_sketches.appendChild(holder);
	});

	// flattens an array:
	function flatten(arr, result = []) {
		for (let i = 0, length = arr.length; i < length; i++) {
			const value = arr[i];
				if (Array.isArray(value)) {
		  			flatten(value, result);
				} else {
		  			result.push(value);
				}
			}
		return result;
	};
})

