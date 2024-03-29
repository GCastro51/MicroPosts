class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts) {
    let output = '';

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `
    });

    this.post.innerHTML = output;
  }

  // show alerts above posts div
  showAlert(msg, className) {
    this.clearAlert();

    // Create div
    const div = document.createElement('div');
    // add classes
    div.className = className;
    // add Text
    div.appendChild(document.createTextNode(msg));
    // Get parent
    const container = document.querySelector('.postsContainer');
    // Get posts
    const posts = this.post;
    // insert alert div
    container.insertBefore(div, posts);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
    
  }

  // fill form for edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  // Clear ID hidden value
  clearIdInput() {
    this.idInput.value = '';
  }

  // Change form state
  changeFormState(type) {
    if(type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block mb-2';

      // Create Cancel Button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));
      // Insert into dom - get parent
      const cardForm = document.querySelector('.card-form');
      // Get element to insert before
      const formEnd = document.querySelector('.form-end');
      // Insert cancel button
      cardForm.insertBefore(button, formEnd);

    } else {
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block mb-2';
      // Remove cancel btn if present
      if(document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      // Clear IF from hidden field
      this.clearIdInput();
      // Clear text files
      this.clearFields();
    }
  }

  // clear alert box
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if(currentAlert) {
      currentAlert.remove();
    }
  }

  // clear input fields
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
}

export const ui = new UI();