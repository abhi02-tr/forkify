import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _data;
  page;

  render(search) {
    this._data = search;
    this.page = +this._data.page;
    this._generateMarkup();
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline ');
      if (!btn) return;
      //   console.log(btn);
      handler(btn.dataset.goto);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    let html;

    if (this._data.page === 1 && numPages > 1) {
      html = `
        <button data-goto=${
          this.page + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${this.page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    if (this._data.page === numPages) {
      html = `
        <button data-goto=${
          this.page - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.page - 1}</span>
        </button>

        `;
    }

    if (this._data.page < numPages && this.page !== 1) {
      html = `
        <button data-goto=${
          this.page - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.page - 1}</span>
        </button>
        <button data-goto=${
          this.page + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${this.page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }
}

export default new PaginationView();
