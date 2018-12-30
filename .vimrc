" :source ~/.vimrc

set autoindent
set backspace=2
" https://stackoverflow.com/questions/1636297/how-to-change-the-folder-path-for-swp-files-in-vim
set directory=$HOME/.vim/swapfiles//
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

autocmd!
" autochdir
autocmd BufEnter * silent! lcd %:p:h
" auto remove trailing whitespace
autocmd BufRead,BufWrite * if ! &bin | silent! %s/\s\+$//e | endif
filetype on
filetype plugin on
syntax on

if !exists(":Vimrc")
    command! -nargs=* Vimrc call MyVimrc(<f-args>)
    function! MyVimrc(...)
        :source ~/.vimrc
    endfunction
endif

function! MyCommentRegion(...)
" this function will comment selected-region
    " un-comment
    if a:1 == 'u'
        '<,'>s/^\(\s*\)\(""\|#\|%%\|\/\/\)!! /\1/e
        '<,'>s/^\(\s*\)<\!--!! \(.*\) -->/\1\2/e
    " comment \"\"
    elseif a:1 == '"'
        '<,'>s/^\(\s*\)\(\S\)/\1""!! \2/e
    " comment #
    elseif a:1 == '#'
        '<,'>s/^\(\s*\)\(\S\)/\1#!! \2/e
    " comment %%
    elseif a:1 == '%'
        '<,'>s/^\(\s*\)\(\S\)/\1%%!! \2/e
    " comment //
    elseif a:1 == '/'
        '<,'>s/^\(\s*\)\(\S\)/\1\/\/!! \2/e
    " comment <!-- ... -->
    elseif a:1 == '<'
        '<,'>s/^\(\s*\)\(\S.*\)/\1<!--!! \2 -->/e
    endif
    " restore position
    call setpos('.', getpos("'<"))
endfunction

function! MyStringifyRegion(...)
" this function will js-stringify-add selected-region
    " un-stringify
    if a:1 == 'u'
        '<,'>s/^\(\s*\)\(+ "\|"\)\(.*\)"$/\1\3/e
        '<,'>s/\\n\\$//e
        '<,'>s/\\\("\|'\)/\1/e
    " stringify + "..."
    elseif a:1 == '+'
        '<,'>s/"/\\"/e
        '<,'>s/\S.*/+ "&"/e
    " stringify ...\n\
    elseif a:1 == '\'
        '<,'>s/'/\\'/e
        '<,'>s/$/\\n\\/e
    endif
    " restore position
    call setpos('.', getpos("'<"))
endfunction

function! MyRename(name, bang)
" this function will rename file <name> -> <bang>
" https://github.com/vim-scripts/Rename/blob/0.3/plugin/Rename.vim
	let l:name    = a:name
	let l:oldfile = expand('%:p')
	if bufexists(fnamemodify(l:name, ':p'))
		if (a:bang ==# '!')
			silent exe bufnr(fnamemodify(l:name, ':p')) . 'bwipe!'
		else
			echohl ErrorMsg
			echomsg 'A buffer with that name already exists (use ! to override).'
			echohl None
			return 0
		endif
	endif
	let l:status = 1
	let v:errmsg = ''
	silent! exe 'saveas' . a:bang . ' ' . l:name
	if v:errmsg =~# '^$\|^E329'
		let l:lastbufnr = bufnr('$')
		if expand('%:p') !=# l:oldfile && filewritable(expand('%:p'))
			if fnamemodify(bufname(l:lastbufnr), ':p') ==# l:oldfile
				silent exe l:lastbufnr . 'bwipe!'
			else
				echohl ErrorMsg
				echomsg 'Could not wipe out the old buffer for some reason.'
				echohl None
				let l:status = 0
			endif
			if delete(l:oldfile) != 0
				echohl ErrorMsg
				echomsg 'Could not delete the old file: ' . l:oldfile
				echohl None
				let l:status = 0
			endif
		else
			echohl ErrorMsg
			echomsg 'Rename failed for some reason.'
			echohl None
			let l:status = 0
		endif
	else
		echoerr v:errmsg
		let l:status = 0
	endif
	return l:status
endfunction
command! -nargs=* -complete=file -bang Rename call Rename(<q-args>, '<bang>')

" insert-mode remap
inoremap <c-a> <c-o>^
inoremap <c-d> <c-o>x
inoremap <c-e> <c-o>$
inoremap <c-k> <c-o>D
" non-recursive remap
nnoremap <silent> !bc :bp<bar>sp<bar>bn<bar>bd!<CR>
nnoremap <silent> "+ :call MyStringifyRegion('+')<cr><cr>
nnoremap <silent> "\ :call MyStringifyRegion('\')<cr><cr>
nnoremap <silent> "u :call MyStringifyRegion('u')<cr><cr>
nnoremap <silent> #" :call MyCommentRegion('"')<cr><cr>
nnoremap <silent> #% :call MyCommentRegion('%')<cr><cr>
nnoremap <silent> #/ :call MyCommentRegion('/')<cr><cr>
nnoremap <silent> #<char-0x23> :call MyCommentRegion('#')<cr><cr>
nnoremap <silent> #u :call MyCommentRegion('u')<cr><cr>
" visual-mode remap
vnoremap <silent> "+ <esc>:call MyStringifyRegion('+')<cr><cr>
vnoremap <silent> "\ <esc>:call MyStringifyRegion('\')<cr><cr>
vnoremap <silent> "u <esc>:call MyStringifyRegion('u')<cr><cr>
vnoremap <silent> #" <esc>:call MyCommentRegion('"')<cr><cr>
vnoremap <silent> #% <esc>:call MyCommentRegion('%')<cr><cr>
vnoremap <silent> #/ <esc>:call MyCommentRegion('/')<cr><cr>
vnoremap <silent> #< <esc>:call MyCommentRegion('<')<cr><cr>
vnoremap <silent> #<char-0x23> <esc>:call MyCommentRegion('#')<cr><cr>
vnoremap <silent> #u <esc>:call MyCommentRegion('u')<cr><cr>
