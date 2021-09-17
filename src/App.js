import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import logo from './logo.svg';
import './App.css';

function App() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <>
      <Editor
        apiKey="frrix5f6jsh26jzcp3yucjinkqwt7olh66vj7py7el1535zu"
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          selector: 'textarea#full-featured-non-premium',
          language: "vi_VN",
          // images_upload_url: 'http://103.226.248.62:3009/api/upload-file',
          images_upload_handler: function (blobInfo, success, failure) {
            var xhr, formData;
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', 'http://103.226.248.62:3009/api/upload-file');
            xhr.onload = function () {
              // var json;
              if (xhr.status !== 200) {
                failure('Có lỗi xảy ra');
                return;
              }
              // json = JSON.parse(xhr.responseText);
              // if (!json || typeof json.location != 'string') {
              //   failure('Invalid JSON: ' + xhr.responseText);
              //   return;
              // }
              // success(json.location);
              success(xhr.response);
            };
            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            xhr.send(formData);
          },
          // automatic_uploads: false,
          // images_upload_base_path: '/some/basepath',
          // images_upload_credentials: true,
          plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
          imagetools_cors_hosts: ['picsum.photos'],
          menubar: 'file edit view insert format tools table help',
          toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
          toolbar_sticky: true,
          autosave_ask_before_unload: true,
          autosave_interval: '30s',
          autosave_prefix: '{path}{query}-{id}-',
          autosave_restore_when_empty: false,
          autosave_retention: '2m',
          image_advtab: true,
          link_list: [
            { title: 'My page 1', value: 'https://www.tiny.cloud' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
          ],
          image_list: [
            { title: 'My page 1', value: 'https://www.tiny.cloud' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
          ],
          image_class_list: [
            { title: 'None', value: '' },
            { title: 'Some class', value: 'class-name' }
          ],
          importcss_append: true,
          // file_picker_callback: function (callback, value, meta) {
          //   /* Provide file and text for the link dialog */
          //   if (meta.filetype === 'file') {
          //     callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
          //   }

          //   /* Provide image and alt text for the image dialog */
          //   if (meta.filetype === 'image') {
          //     callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
          //   }

          //   /* Provide alternative source and posted for the media dialog */
          //   if (meta.filetype === 'media') {
          //     callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
          //   }
          // },
          templates: [
            { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
            { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
            { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
          ],
          template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
          template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
          height: 600,
          image_caption: true,
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          noneditable_noneditable_class: 'mceNonEditable',
          toolbar_mode: 'sliding',
          contextmenu: 'link image imagetools table',
          skin: useDarkMode ? 'oxide-dark' : 'oxide',
          content_css: useDarkMode ? 'dark' : 'default',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}

export default App;
