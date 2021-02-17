const Handlebars = require('handlebars');
module.exports = {
    sum: (a, b) => a + b, //hỗ trợ cộng chỉ mục. Nó giống tạo thư viện r import vô
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'fas fa-sort',
            asc: 'fas fa-sort-up',
            desc: 'fas fa-sort-down',
        };
        const types = {
            default: 'desc',
            asc: 'desc', //nếu mà để 'asc' thì khi bấm vô sẽ ko sort đc cái cũ lại
            desc: 'asc',
        };
        const icon = icons[sortType];
        const type = types[sortType];
        const href = Handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );
        const output = `
                <a href="${href}">
                    <i class="${icon}"></i>
                 </a>
                `;
        return new Handlebars.SafeString(output);
    },
};
