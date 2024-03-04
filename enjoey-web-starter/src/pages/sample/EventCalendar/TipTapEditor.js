import './styles.css'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
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

  const extensions = [
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
  ]

  const MenuBar = () => {
    const { editor } = useCurrentEditor()
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
          title="Bold"
        >
          <RiBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`menu-item${editor.isActive('italic') ? ' is-active' : ''}`}
          title="Italic"
        >
          <RiItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`menu-item${editor.isActive('strike') ? ' is-active' : ''}`}
          title="Strike Through"
        >
          <RiStrikethrough />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`menu-item${editor.isActive('paragraph') ? ' is-active' : ''}`}
          title="Paragraph"
        >
          <RiParagraph />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`menu-item${editor.isActive('heading', { level: 1}) ? ' is-active' : ''}`}
          title="Heading 1"
        >
          <RiH1 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`menu-item${editor.isActive('heading', { level: 2}) ? ' is-active' : ''}`}
          title="Heading 2"
        >
          <RiH2 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`menu-item${editor.isActive('heading', { level: 3}) ? ' is-active' : ''}`}
          title="Heading 3"
        >
          <RiH3 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`menu-item${editor.isActive('bulletList') ? ' is-active' : ''}`}
          title="Bullet List"
        >
          <RiListUnordered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`menu-item${editor.isActive('orderedList') ? ' is-active' : ''}`}
          title="Ordered List"
        >
          <RiListOrdered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`menu-item${editor.isActive('blockquote') ? ' is-active' : ''}`}
          title="Quote"
        >
          <RiDoubleQuotesL />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="menu-item"
          title="Divider"
        >
          <RiSeparator />
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="menu-item"
          title="Break"
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
          title="Undo"
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
          title="Redo"
        >
          <RiArrowGoForwardLine />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className="menu-item"
          title="Table"
        >
          <RiTableLine />
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.can().addColumnBefore()}
          className="menu-item"
          title="Insert Left Column"
        >
          <RiInsertColumnLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()}
          className="menu-item"
          title="Insert Right Column"
        >
          <RiInsertColumnRight />
        </button>
        <button
          onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.can().addRowBefore()}
          className="menu-item"
          title="Insert Top Row"
        >
          <RiInsertRowTop />
        </button>
        <button
          onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()}
          className="menu-item"
          title="Insert Bottom Row"
        >
          <RiInsertRowBottom />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().mergeCells().run()} disabled={!editor.can().mergeCells()}
          className="menu-item"
          title="Merge Cells"
        >
          <RiMergeCellsHorizontal />
        </button>
        <button
          onClick={() => editor.chain().focus().splitCell().run()} disabled={!editor.can().splitCell()}
          className="menu-item"
          title="Split Cells"
        >
          <RiSplitCellsHorizontal />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()}
          className="menu-item"
          title="Delete Column"
        >
          <RiDeleteColumn />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()}
          className="menu-item"
          title="Delete Row"
        >
          <RiDeleteRow />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()}
          className="menu-item"
          title="Delete Table"
        >
          <RiDeleteBin5Line />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().insertTable({ rows: 1, cols: 2, withHeaderRow: false, borderStyle: 'dotted' }).run()}
          className="menu-item"
          title="Create Section"
        >
          <RiTableLine />
        </button>
        <button
          className="menu-item"
          title="Insert Left Section"
        >
          <RiInsertColumnLeft />
        </button>
        <button
          className="menu-item"
          title="Insert Right Section"
        >
          <RiInsertColumnRight />
        </button>
        <button
          className="menu-item"
          title="Delete Section"
        >
          <RiDeleteColumn />
        </button>
        <div className="divider" />
        <button onClick={addImage} className="menu-item" title="Add Image"><RiFileImageLine /></button>
        <div className="divider" />
        <button onClick={handleGetHtml} className="menu-item" title="Show HTML"><RiDownload2Fill /></button>
      </div>
    )
  }
  
  return (
    <div className="editor">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
      />
      <div>{html}</div>
    </div>
  );
};

export default TipTapEditor;