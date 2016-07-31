":source ~/.vimrc"
autocmd!
"autochdir"
autocmd BufEnter * silent! lcd %:p:h
"auto remove trailing whitespace"
autocmd BufRead,BufWrite * if ! &bin | silent! %s/\s\+$//e | endif
filetype on
filetype plugin on
inoremap <c-a> <c-o>^
inoremap <c-e> <c-o>$
inoremap <c-k> <c-o>D
inoremap <c-d> <c-o>x
set autoindent
set backspace=2
"central swap file location"
set directory=~/.vim
set expandtab
set hidden
set hlsearch
set ignorecase
set incsearch
set laststatus=2
set nocompatible
set noerrorbells
set noswapfile
set pastetoggle=<f2>
set scrolloff=4
set shiftwidth=2
set showmatch
set smartcase
set softtabstop=2
set statusline=%l\ %c\ %F%m%r%h%w\ %y\ %p%%
set tabstop=4
syntax on

if !exists(":Vimrc")
  command! -nargs=* Vimrc call MyVimrc(<f-args>)
  function! MyVimrc(...)
    :so ~/.vimrc
  endfunction
endif

function! MyCommentRegion(...)
  "uncomment"
  if !a:0
    '<,'>s/^\(\s*\)\(""\|#\|%%\|\/\/\)!! /\1/e
    '<,'>s/^\(\s*\)<\!--!! \(.*\) -->/\1\2/e
  "comment \"\""
  elseif a:1 == '"'
    '<,'>s/^\(\s*\)\(\S\)/\1""!! \2/e
  "comment #"
  elseif a:1 == '#'
    '<,'>s/^\(\s*\)\(\S\)/\1#!! \2/e
  "comment %%"
  elseif a:1 == '%'
    '<,'>s/^\(\s*\)\(\S\)/\1%%!! \2/e
  "comment //"
  elseif a:1 == '/'
    '<,'>s/^\(\s*\)\(\S\)/\1\/\/!! \2/e
  "comment <!-- ... -->"
  elseif a:1 == '<'
    '<,'>s/^\(\s*\)\(\S.*\)/\1<!--!! \2 -->/e
  endif
  "restore position"
  call setpos('.', getpos("'<"))
endfunction

nnoremap <silent> !bc :bp<bar>sp<bar>bn<bar>bd!<CR>
nnoremap <silent> #! :call MyCommentRegion()<cr><cr>
nnoremap <silent> #<char-0x23> :call MyCommentRegion('#')<cr><cr>
nnoremap <silent> #% :call MyCommentRegion('%')<cr><cr>
nnoremap <silent> #/ :call MyCommentRegion('/')<cr><cr>
nnoremap <silent> #" :call MyCommentRegion('"')<cr><cr>
vnoremap <silent> #! <esc>:call MyCommentRegion()<cr><cr>
vnoremap <silent> #<char-0x23> <esc>:call MyCommentRegion('#')<cr><cr>
vnoremap <silent> #% <esc>:call MyCommentRegion('%')<cr><cr>
vnoremap <silent> #/ <esc>:call MyCommentRegion('/')<cr><cr>
vnoremap <silent> #< <esc>:call MyCommentRegion('<')<cr><cr>
vnoremap <silent> #" <esc>:call MyCommentRegion('"')<cr><cr>

augroup filetypedetect
  au BufNewFile,BufRead *.pig set filetype=pig syntax=pig
augroup END
