import './styles.css'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import { EditorProvider, useCurrentEditor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useState } from 'react'

import { 
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiParagraph,
  RiH1,
  RiH2,
  RiH3,
  RiListUnordered,
  RiListOrdered,
  RiDoubleQuotesL,
  RiSeparator,
  RiTextWrap,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiTableLine,
  RiInsertColumnLeft,
  RiInsertColumnRight,
  RiInsertRowTop,
  RiInsertRowBottom,
  RiMergeCellsHorizontal,
  RiSplitCellsHorizontal,
  RiDeleteColumn,
  RiDeleteRow,
  RiDeleteBin5Line,
  RiFileImageLine,
  RiDownload2Fill,
} from 'react-icons/ri';

const TipTapEditor = () => {
  const [html, setHtml] = useState('');
  const CustomTableCell = TableCell.extend({
    addAttributes() {
      return {
        // extend the existing attributes …
        ...this.parent?.(),
  
        // and add a new one …
        backgroundColor: {
          default: null,
          parseHTML: element => element.getAttribute('data-background-color'),
          renderHTML: attributes => {
            return {
              'data-background-color': attributes.backgroundColor,
              style: `background-color: ${attributes.backgroundColor}`,
            }
          },
        },
      }
    },
  })

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      CustomTableCell,
      Image,
      Dropcursor,
      Document,
    ],
    content:`
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
        That’s a bullet list with one …
        </li>
        <li>
        … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
        display: none;
      }</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
      <table style="width:100%">
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Age</th>
        </tr>
        <tr>
          <td>Jill</td>
          <td>Smith</td>
          <td>50</td>
        </tr>
        <tr>
          <td>Eve</td>
          <td>Jackson</td>
          <td>94</td>
        </tr>
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td>80</td>
        </tr>
      </table>
      <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />
    `
  })

  const MenuBar = () => {
    if (!editor) {
      return null
    }
  
    const handleGetHtml = () => {
      if (editor) {
        const htmlContent = editor.getHTML();
        setHtml(htmlContent);
      }
    };

    const addImage = () => {
      const url = window.prompt('URL')
  
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    }
  
    return (
      <div className="editor-header">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`menu-item${editor.isActive('bold') ? ' is-active' : ''}`}
          
        >
          <RiBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`menu-item${editor.isActive('italic') ? ' is-active' : ''}`}
        >
          <RiItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`menu-item${editor.isActive('strike') ? ' is-active' : ''}`}
        >
          <RiStrikethrough />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`menu-item${editor.isActive('paragraph') ? ' is-active' : ''}`}
        >
          <RiParagraph />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`menu-item${editor.isActive('heading', { level: 1}) ? ' is-active' : ''}`}
        >
          <RiH1 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`menu-item${editor.isActive('heading', { level: 2}) ? ' is-active' : ''}`}
        >
          <RiH2 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`menu-item${editor.isActive('heading', { level: 3}) ? ' is-active' : ''}`}
        >
          <RiH3 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`menu-item${editor.isActive('bulletList') ? ' is-active' : ''}`}
        >
          <RiListUnordered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`menu-item${editor.isActive('orderedList') ? ' is-active' : ''}`}
        >
          <RiListOrdered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`menu-item${editor.isActive('blockquote') ? ' is-active' : ''}`}
        >
          <RiDoubleQuotesL />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="menu-item"
        >
          <RiSeparator />
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="menu-item"
        >
          <RiTextWrap />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="menu-item"
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <RiArrowGoBackLine />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="menu-item"
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <RiArrowGoForwardLine />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className="menu-item"
        >
          <RiTableLine />
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.can().addColumnBefore()}
          className="menu-item"
        >
          <RiInsertColumnLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()}
          className="menu-item"
        >
          <RiInsertColumnRight />
        </button>
        <button
          onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.can().addRowBefore()}
          className="menu-item"
        >
          <RiInsertRowTop />
        </button>
        <button
          onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()}
          className="menu-item"
        >
          <RiInsertRowBottom />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().mergeCells().run()} disabled={!editor.can().mergeCells()}
          className="menu-item"
        >
          <RiMergeCellsHorizontal />
        </button>
        <button
          onClick={() => editor.chain().focus().splitCell().run()} disabled={!editor.can().splitCell()}
          className="menu-item"
        >
          <RiSplitCellsHorizontal />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()}
          className="menu-item"
        >
          <RiDeleteColumn />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()}
          className="menu-item"
        >
          <RiDeleteRow />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()}
          className="menu-item"
        >
          <RiDeleteBin5Line />
        </button>
        <div className="divider" />
        <button onClick={addImage} className="menu-item"><RiFileImageLine /></button>
        <div className="divider" />
        <button onClick={handleGetHtml} className="menu-item"><RiDownload2Fill /></button>
      </div>
    )
  }
  
  return (
    <div className="editor">
      <MenuBar editor={editor} />
      <EditorContent className="editor-content" editor={editor} />
      <div>{html}</div>
    </div>
  );
};

export default TipTapEditor;