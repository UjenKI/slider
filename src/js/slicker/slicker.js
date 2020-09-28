class myOwnSlicker {
    constructor(options ={}){
        this.options = {
            wrapper: options.wrapper,
            slideToShow: options.slideToShow,
            slideToScroll: options.slideToScroll,
            dots: options.dots,
            imageSlideNav: true,
            infinite: true
        }

        this.default = {
            count: 0,
            button: [],
            items: [],
            dots: [],
            slidePosition: {
                min: 0,
                max: this.options.wrapper.children.length - 1, 
            }
        }

        // this.checkOptions();
        this.setWidthForWrapper(this.options.wrapper, this.options.slideToShow);
        this.setSliderItems(this.options.wrapper);
        this.markSlideItem(this.options.wrapper);
        this.buildArrowsForSlider(this.options.wrapper);
        
        this.setDataAttr(this.options.wrapper);
        
        this.arrowEvent(this.default.button, this.options.wrapper, this.default.count, this.options.slideToShow);
        this.buildDotsForSlider(this.options.wrapper, this.options.dots, this.options.slideToScroll);
        this.dotsAction(this.options.wrapper, this.default.dots);
    }

    setSliderItems(wrapper){
        const sliderItem = wrapper.children;
        sliderItem.forEach((item, i) => {
            this.default.items.push({item: item, position: i, mLeft: 0})
        })
    }

    setWidthForWrapper(wrapCount, slideToShow){
        const slideCount = wrapCount.children.length;
        wrapCount.style.display = 'flex';
        wrapCount.style.width = `${(slideCount*100)/slideToShow}%`;
        wrapCount.children.forEach(item => {
            item.style.width = `${100/slideToShow}%`;
            const img = item.querySelector('img');
            img.style.width = '100%';
        })
    }

    buildArrowsForSlider(wrapper){
        const wrapParent = wrapper.parentElement,
              arrowWrapper = document.querySelector('.slider');

        const arrowParent = document.createElement('div');
        arrowParent.classList.add('slide_arrows');

        const prevArrow = document.createElement('button');
        const nextArrow = document.createElement('button');

        prevArrow.classList.add('arrow-btn', 'prev');
        nextArrow.classList.add('arrow-btn', 'next');

        arrowWrapper.append(prevArrow);
        arrowWrapper.append(nextArrow);

        this.default.button.push(prevArrow, nextArrow)

        wrapParent.append(arrowParent);
    }

    buildDotsForSlider(wrapper, isDote, slideToShow){
        if(!isDote) return;
        const dotsWrapper = wrapper.parentElement,
              wrapLenght = wrapper.children.length,
              dotsItem = document.createElement('div');
        
        
        dotsItem.classList.add('dots-list');
        dotsWrapper.append(dotsItem);

        for(let i = 0; i < (wrapLenght/slideToShow); i++){
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dotsItem.append(dot);
            this.default.dots.push(dot);
        }

        this.dotsActive(dotsItem, this.default.count);
    }

    dotsActive(dotsItem, slideCount){
        const slideDots = dotsItem.children;  
        slideDots.forEach((item, i) => {
            item.classList.remove('dot-active');
            console.log(slideCount);
            if(i == slideCount){
                item.classList.add('dot-active');
            }
        })                                   
    }

    setDataAttr(wrapper){
        wrapper.children.forEach((item, i) => {
            item.setAttribute('data-id', i+1);
        })
    }

    markSlideItem(wrapper){
        const slideItemMark = wrapper.children;
        slideItemMark[0].classList.add('first');
        slideItemMark[slideItemMark.length-1].classList.add('last');
    }

    dotsAction(wrapper, dotsList){
        dotsList.forEach((item, i) => {
           item.addEventListener('click', (e) => {
                dotsList.forEach(dotIndex => {
                    dotIndex.classList.remove('dot-active');
                })
                e.target.classList.add('dot-active');
                wrapper.style.marginLeft = `0%`
                wrapper.style.marginLeft = `-${i*100}%`
                this.default.count = i;
            })
        })
    }

    arrowEvent(arrows, wrapper, slideCount, slideToShow){
        let marginLeft = 0;
        arrows.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.target;
                if(target.classList.contains('next')){
                    marginLeft += -100/slideToShow;
                    slideCount++;
                    this.default.count = slideCount;
                    if(slideCount == wrapper.children.length - slideToShow + 1){
                        marginLeft = 0;
                        slideCount = 0;
                        this.default.count = slideCount;
                    }
                } else {
                    marginLeft += 100/slideToShow;
                    slideCount--;
                    this.default.count = slideCount;
                    if((slideCount+1) == 0){
                        marginLeft = -(((wrapper.children.length-1)*100));
                        slideCount = wrapper.children.length-1;
                        this.default.count = slideCount;
                    }
                    
                }
                // console.log(this.default.count);
                wrapper.style.marginLeft = `${marginLeft}%`;
                this.dotsActive(document.querySelector('.dots-list'), this.default.count);
            })
        })
    }



}

export default myOwnSlicker;