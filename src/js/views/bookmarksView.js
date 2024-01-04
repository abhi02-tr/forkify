import View from './View';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError('No Bookmark.');
    this._data = data;
    this._generateMarkup();
  }

  _generateMarkup() {
    let html = '';
    let id = window.location.hash.slice(1);

    this._data.forEach(data => {
      html += `
                    <li class="preview">
                        <a class="preview__link ${
                          id == data.id ? 'preview__link--active' : ''
                        }" href="#${data.id}">
                        <figure class="preview__fig">
                            <img src="${data.image}" alt="Test" />
                        </figure>
                        <div class="preview__data">
                            <h4 class="preview__title">${data.title}</h4>
                            <p class="preview__publisher">${data.publisher}</p>
                            
                        </div>
                        </a>
                    </li>
                `;
    });

    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }
}

export default new BookmarksView();
