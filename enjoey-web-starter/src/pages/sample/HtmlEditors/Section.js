// CustomTable.js
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableRow from '@tiptap/extension-table-row';

export const CustomTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      borderStyle: {
        default: 'solid',
        parseHTML: element => element.getAttribute('data-border-style') || 'dotted',
        renderHTML: attributes => {
          return {
            'data-border-style': attributes.borderStyle,
            style: `border-style: ${attributes.borderStyle}`,
          };
        },
      },
    };
  },
});


export const CustomTableRow = TableRow.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
    };
  },
});
