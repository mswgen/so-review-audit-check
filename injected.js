const dataHolder = document.createElement("div");
dataHolder.setAttribute("id", "so-review-audit-check");
dataHolder.setAttribute("style", "display: none;");
(document.body || document.documentElement).appendChild(dataHolder);
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.type == "attributes") {
            const responseBody = mutation.target.getAttribute('so-review-audit-check');
            try {
                if (JSON.parse(responseBody).reviewTaskId) {
                    if (JSON.parse(responseBody).isAudit) {
                        const element = document.createElement('div');
                        element.setAttribute('class', 's-notice s-notice__info');
                        element.innerHTML = '<p class="fw-bold">Warning: This is an audit.</p><p class="mb0">This is an audit, not an actual review. three incorrent answers will result a temporary review ban.</p>';
                        document.querySelector('.js-review-content.flex--item.fl1.wmn0 > aside').classList.remove('d-none');
                        document.querySelector('.js-review-content.flex--item.fl1.wmn0 > aside').appendChild(element);
                    }
                }
            } catch (e) { }
        }
    });
});
observer.observe(dataHolder, {
    attributes: true
});
const __so_review_audit_check__patch = () => {
    let oldXHROpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function () {
        this.addEventListener("load", function () {
            const responseBody = this.responseText;
            document.getElementById('so-review-audit-check').setAttribute('so-review-audit-check', responseBody)
        });
        return oldXHROpen.apply(this, arguments);
    };
};
__so_review_audit_check__patch();