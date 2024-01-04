import icons from '../../img/icons.svg';
import View from './View';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _data;

  render(data) {
    this._data = data;
    this._generateMarkup();
  }

  // preview__link--active

  // addClickListener(handler) {
  //   this._parentEl.addEventListener('click', e => {
  //     e.preventDefault();

  //     const item = e.target.closest('.preview');
  //     console.log(item);
  //     item.classlist.add('preview__link--active');
  //   });
  // }

  // <div class="preview__user-generated">
  //                       <svg>
  //                           <use href="${icons}#icon-user"></use>
  //                       </svg>
  //                       </div>
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

export default new ResultsView();
