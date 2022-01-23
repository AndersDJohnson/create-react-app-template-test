import './App.css';
import { memo, useEffect, useState, useMemo } from 'react';

const randomColor = () => `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
const randomBackground = () => ({ background: randomColor(), padding: '8px', margin: '4px' })

function Updater () {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setCount(c => {
        return c+1
      })
    }, 1000)
  }, [])

  return <span style={{...randomBackground(), display: 'inline-block' }}>[updater]</span>
}

function _MemoedInnerChild () {
  console.log('*** rendering memoed inner child')

  return <div style={randomBackground()}>[memoed inner child]</div>
}

const MemoedInnerChild = memo(_MemoedInnerChild)

function InnerChild () {
  console.log('*** rendering inner child')

  return <div style={randomBackground()}>[inner child]</div>
}

function _MemoedInnerChildPassedChildren (props) {
  console.log('*** rendering memoed inner child passed children')

  return <div style={randomBackground()}>[memoed inner child passed children {props.children}]</div>
}

const MemoedInnerChildPassedChildren = memo(_MemoedInnerChildPassedChildren)

function _MemoedInnerChildPassedUseMemoedChildren (props) {
  console.log('*** rendering memoed inner child passed children')

  return <div style={randomBackground()}>[memoed inner child passed useMemoed children {props.children}</div>
}

const MemoedInnerChildPassedUseMemoedChildren = memo(_MemoedInnerChildPassedUseMemoedChildren)

function InnerChildPassedChildren (props) {
  console.log('*** rendering inner child passed children')

  return <div style={randomBackground()}>[inner child passed children {props.children}]</div>
}

function Child () {
  console.log('*** rendering child')

  return <div style={randomBackground()}>[child]</div>
}

function Wrapper (props) {
  console.log('*** rendering wrapper')
  const [count, setCount] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setCount(c => {
        console.log('*** setting count', c, '=>', c+1)
        return c+1
      })
    }, 3000)
  }, [])

  const hello = <span>[hello]</span>
  const there = <span>[there]</span>
  const memoed = useMemo(() => <span>static</span>, [])
  const memoedUpdater = useMemo(() => <span>updater: <Updater /></span>, [])

  return (
    <div>[wrapper count={count}]
      <InnerChild />
      <MemoedInnerChild />
      <InnerChildPassedChildren>{hello}</InnerChildPassedChildren>
      <MemoedInnerChildPassedChildren>{there}</MemoedInnerChildPassedChildren>
      <MemoedInnerChildPassedUseMemoedChildren>{memoed}</MemoedInnerChildPassedUseMemoedChildren>
      <MemoedInnerChildPassedUseMemoedChildren>{memoedUpdater}</MemoedInnerChildPassedUseMemoedChildren>
      {props.children}
      [/wrapper]
    </div>
  )
}

function App() {
  return (
    <div style={randomBackground()}>
      (App)

      <Wrapper>
        <Child />
      </Wrapper>
    </div>
  );
}

export default App;
