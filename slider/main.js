class IndexForSibilings {
    static get(el){
        let children = el.parentNode.children;

        for(let i = 0; i < children.length; i++){
            let child = children[i];
            if(child == el) return i;
        }
    }
}


class Slider{
    constructor(selector, movimiento=true){
        this.move = this.move.bind(this);
        this.moveByButton = this.moveByButton.bind(this);
        this.slider = document.querySelector(selector);
        this.itemsCount = this.slider.querySelectorAll(".container > *").length;
        this.movimiento = movimiento;
        this.interval = null;
        this.contador = 0;

        this.start();
        this.builControls();
        this.bindEvents();
    }

    start(){
        if(!this.movimiento) return;
        this.interval = window.setInterval(this.move, 3000);
    }

    restart() {
        if(this.interval) window.clearInterval(this.interval);
        this.start();
    }

    bindEvents(){
        this.slider.querySelectorAll(".controls li")
            .forEach(item => {
                item.addEventListener("click", this.moveByButton)
            });
    }

    moveByButton(ev){
        let index = IndexForSibilings.get(ev.currentTarget);
        console.log(index);
        this.contador = index;
        this.moveTo(index);
        this.restart();
    }

    builControls() {
        for(let i = 0; i < this.itemsCount; i++){
            let control = document.createElement("li");

            if(i == 0) control.classList.add("active");

            this.slider.querySelector(".controls ul").appendChild(control);
        }
    }

    move(){
        this.contador += 1;

        if(this.contador > this.itemsCount - 1) this.contador = 0;
        this.moveTo(this.contador)
    }

    resetIndicator() {
        this.slider.querySelectorAll(".controls li.active")
            .forEach(item => {
                item.classList.remove("active");
            });
    }

    moveTo(index){
        let left = index * 100;
        this.resetIndicator();
        
        this.slider.querySelector(".controls li:nth-child(" + (index + 1) + ")").classList.add("active");
        this.slider.querySelector(".container").style.left = "-" + left + "%";
    }
}

(function(){

    new Slider(".slider");

})();