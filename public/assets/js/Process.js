class Process
{
    static init()
    {
        let processbars = document.querySelectorAll('.process')
        processbars.forEach((elt) => {
            let bar = document.createElement('span')
            bar.classList.add(`process--${elt.dataset.type}`)
            bar.style.width = elt.dataset.process + '%'

            elt.appendChild(bar)
        })
    }

}
