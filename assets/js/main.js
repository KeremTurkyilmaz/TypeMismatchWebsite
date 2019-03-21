window.addEventListener("load", function(e){

	// sort data per date:
	data.sort(function(a, b){
		const da = a.data.split('.');
		const db = b.data.split('.');
		// check della data in formato DD.MM.YYYY
		// a partire dall'anno...
		for (let i=2; i>=0; i--){
			if (parseInt(da[i]) > parseInt(db[i])) return false;
			else if (parseInt(da[i]) < parseInt(db[i])) return true;
			// continua se uguale...
		}
		return false;
	});

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
		li.classList.add("nave");
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

	// Legge il file data.js e crea i vari contenuti
	const el_sketches = document.querySelector(".sketches");

	data.forEach(function(el){
		const sketch = document.createElement("div");
		sketch.classList.add("sketch");
		sketch.classList.add("margine");		
		var link = ('url(' + el.img_url_abs + ')');
		el.tags.forEach(function(tag){
			sketch.classList.add("tag-" + tag);
		})
		let html = "";
		html += "<div class='bg'></div>";
		html += "<div class='descrizione noFiletto'> <a target='_blank' href='"+el.url+"'>";
		html += "<p class='filetto titolazione'>"+el.titolo+"</p>";
		html += "<p class='ti reveal filetto testo'>"+el.data+"</p>";
		html += "<p class='ti reveal filetto testo'>"+el.desc+"</p>";
		html += "<p class='ti reveal filetto hash'>";
		for (t of el.tags) {
			html += "#" + t + " ";
		}
		html +="</p>";
		// html += "<p class='reveal filetto'><a target='_blank' href='"+el.url+"'>GitHub</a></p>";
		html += "</a></div>";
		sketch.innerHTML = html;
		sketch.querySelector('.bg').style.backgroundImage = 'url(' + el.img_url_abs + ')';
		el_sketches.appendChild(sketch);



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
