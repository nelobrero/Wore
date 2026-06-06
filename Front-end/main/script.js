const API_BASE = 'http://127.0.0.1:8000/api';

// Load items from backend on page load
async function loadItems() {
  const res = await fetch(`${API_BASE}/items/`);
  const items = await res.json();
  const closet = document.querySelector('.closet');

  // Clear only dynamically added items (keep none, we load all from DB)
  closet.innerHTML = '';

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = `item ${item.category}`;
    div.innerHTML = `<img src="${item.image_url}" alt="${item.name}">`;
    closet.appendChild(div);
  });

  // Re-attach click events after loading
  attachImageClicks();
}

// Upload new item
async function uploadItem() {
  const name = document.getElementById('upload-name').value;
  const category = document.getElementById('upload-category').value;
  const file = document.getElementById('upload-file').files[0];
  const status = document.getElementById('upload-status');

  if (!file) { status.textContent = 'Please select an image!'; return; }

  status.textContent = 'Uploading...';
  const formData = new FormData();
  formData.append('image', file);
  formData.append('name', name);
  formData.append('category', category);

  const res = await fetch(`${API_BASE}/upload/`, {
    method: 'POST',
    body: formData
  });

  if (res.ok) {
    status.textContent = 'Uploaded successfully!';
    setTimeout(() => { closeModal(); loadItems(); }, 1000);
  } else {
    status.textContent = 'Upload failed. Try again.';
  }
}

function openModal() { document.getElementById('upload-modal').style.display = 'block'; }
function closeModal() { document.getElementById('upload-modal').style.display = 'none'; }

// Call on page load
loadItems();


function filterCategory(category) {
  const items = document.querySelectorAll('.closet .item');
  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

let topCount = 0;
let accessoryCount = 0;

// Image click event
function attachImageClicks() {
const closetImages = document.querySelectorAll('.closet .item img');
closetImages.forEach(img => {
  img.addEventListener('click', () => {
    const parent = img.closest('.item');
    const isTop = img.closest('.item').classList.contains('tops');
    const isBottom = img.closest('.item').classList.contains('pants');
    const isShoes = img.closest('.item').classList.contains('shoes');
    const isBelt = img.closest('.item').classList.contains('belts');
    const isAccessories = img.closest('.item').classList.contains('accessories');
    const isBag = img.closest('.item').classList.contains('bags')
    

    if (isTop) {
      const topSlot = document.querySelector('.selected-top');
      const topOuterSlot = document.querySelector('.selected-top-outer');

      const topSlotEmpty = topSlot.querySelector('img') === null;
      const topOuterSlotEmpty = topOuterSlot.querySelector('img') === null;


      if (topSlotEmpty){
      topSlot.innerHTML = `<img src="${img.src}" alt="${img.alt}"><p>${img.alt}</p>
      <button class="remove-btn1" onclick="removeSelection('top')">Remove</button>`;
      topCount++;
      } else if (topOuterSlotEmpty){
        topOuterSlot.innerHTML = `<p></p><img src="${img.src}" alt="${img.alt}"><p>${img.alt}</p>`;
        topCount++;
      }
    }

    if (isBottom) {
      const bottomSlot = document.querySelector('.selected-bottom');
      bottomSlot.innerHTML = `<img src="${img.src}" alt="${img.alt}"><p>${img.alt}</p>
       <button class="remove-btn1" onclick="removeSelection('bottom')">Remove</button>`;
    }

    if (isShoes){
      const shoesSlot = document.querySelector('.selected-shoes');
      shoesSlot.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    }

     if (isBelt){
      const beltSlot = document.querySelector('.selected-belt');
      beltSlot.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    }

    if (isAccessories) {
      const slots = document.querySelectorAll('.container-accessories');
      for (let i=0; i < slots.length; i++){
        if (!slots[i].querySelector('img')){
          slots[i].innerHTML= `<img src="${img.src}" alt="${img.alt}">`;
          break;
        }
      }
    }
    if (isBag){
      const bagSlot = document.querySelector('.selected-bag');
      bagSlot.innerHTML = `<img src="${img.src}" alt="${img.alt}">
      `;
    }
  });
});
}

function removeSelection(part) {
  if (part === 'top') {
    const topSlot = document.querySelector('.selected-top');
    topSlot.innerHTML = ``;
    topCount = Math.max(0, topCount - 1);
  }
  if (part === 'top2') {
    const topSlot = document.querySelector('.selected-top-outer');
    topSlot.innerHTML = ``;
    
    topCount = Math.max(1, topCount - 1);
  }
  if (part === 'bottom') {
    const bottomSlot = document.querySelector('.selected-bottom');
    bottomSlot.innerHTML = ``;
  }
  if (part === 'shoes') {
    const shoesSlot = document.querySelector('.selected-shoes');
    shoesSlot.innerHTML = ``;
  }
  if (part === 'belt') {
    const beltSlot = document.querySelector('.selected-belt');
    beltSlot.innerHTML = ``;
  }
  if (part === 'bag') {
    const bagSlot = document.querySelector('.selected-bag');
    bagSlot.innerHTML = `
    `;
  }
}

function removeAccessory(index) {
  const slots = document.querySelectorAll('.container-accessories');
  if (slots[index]) {
    slots[index].innerHTML = "";
    accessoryCount = Math.max(0, accessoryCount - 1);
  }
}
