set path+=/home/dudley/Workspace/functional/**
set tags=/home/dudley/Workspace/functional/tags

set backupdir=.vim/swap
set directory=.vim/swap
set undodir=.vim/undo

" ludovicchabant/vim-gutentags
let g:gutentags_ctags_tagfile = 'tags'
let g:gutentags_project_root = ['.git', '.vimrc']
let g:gutentags_options_file = '.ctags'
