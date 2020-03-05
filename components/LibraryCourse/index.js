import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { any, concat, isNil, keysIn } from 'ramda'
import TreeView from 'react-super-treeview'
import './LibraryCourse.scss'

class LibraryCourse extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.ids && state.data.length == 0) {
      const data = []

      props.courses.forEach(course => {
        let item
        if (isNil(course.meta)) {
          item = {
            id: course.id,
            name: course.name + ` (${props.totalCourses})`,
            isExpanded: false,
            templates: course.templates,
            isChecked: any(item => item === course.templates[0])(props.ids),
            courses: course.courses,
            modules: course.modules,
          }
        } else {
          item = {
            id: course.id,
            name: course.name,
            isExpanded: false,
            children: [],
          }
          let totalCourses = 0
          keysIn(course.meta).forEach((key, index) => {
            item.children.push({
              id: index,
              name: `${key} (${course.meta[key].templates.length})`,
              templates: course.meta[key].templates,
              isChecked: any(el => el === course.meta[key].templates[0])(props.ids),
              courses: course.meta[key].courses,
              modules: course.meta[key].modules,
            })
            totalCourses += course.meta[key].templates.length
          })
          item.name = course.name + ` (${totalCourses})`
        }
        data.push(item)
      })

      return { data }
    }
    // else if (props.ids && state.data.length > 0) {
    //   const data = state.data.map(el => {
    //     if (el.children) {
    //       el.children.map(item => {
    //         if (item.isChecked) {
    //         }
    //       })
    //     } else {
    //       console.log('>>>--->>>   ', el.name.replace(/\s+\(\d*\)/gi, ''), ' ', props.totalCourses)
    //       el.name = el.name.replace(/\s+\(\d*\)/gi, '') + ` (${props.totalCourses})`
    //     }

    //     return el
    //   })

    //   console.log(data)

    //   return { data }
    // }

    return state
  }

  handleFilter(e) {
    if (this.state.data[0].isChecked !== e[0].isChecked) {
      const data = e.map(item => {
        if (item.id !== 0) {
          item.isChecked = e[0].isChecked
        }

        if (item.children) {
          item.children.map(el => {
            el.isChecked = e[0].isChecked
            return el
          })
        }

        return item
      })

      if (e[0].isChecked) {
        const feeds = e[0].templates
        const selected = []
        const courses = e[0].courses
        const modules = e[0].modules
        this.props.change(feeds, selected, courses, modules)
      } else {
        this.props.change([], [], 0, 0)
      }

      this.setState({ data })
    } else {
      let feeds = []
      let selected = []
      let courses = 0
      let modules = 0
      e.map(el => {
        if (el.children) {
          el.children.map(item => {
            if (item.isChecked) {
              feeds = concat(feeds, item.templates)
              selected = concat(selected, [item.name])
              courses += item.courses
              modules += item.modules
            }
          })
        }
      })

      let data = e.map(el => {
        if (el.children) {
          let totalCourses = 0
          el.children.map(item => {
            if (item.isChecked) {
              totalCourses += item.courses
            }
          })
          el.name = el.name.replace(/\s+\(\d*\)/gi, '') + ` (${totalCourses})`
        } else {
          el.name = el.name.replace(/\s+\(\d*\)/gi, '') + ` (${courses})`
        }

        return el
      })

      this.setState({ data })
      this.props.change(feeds, selected, courses, modules)
    }
  }

  render() {
    return (
      <div className="library-course mt-20 border-5">
        <TreeView
          data={this.state.data}
          onUpdateCb={e => this.handleFilter(e)}
          isCheckable={(node, depth) => {
            if (depth === 0 && node.id != 0) return false
            else return true
          }}
          isExpandable={(node, depth) => {
            if (depth == 1 || node.id == 0) {
              return false
            } else {
              return true
            }
          }}
          isDeletable={(node, depth) => false}
        />
      </div>
    )
  }

  componentDidCatch() {
    console.log('Error: LibraryCourse')
  }
}

LibraryCourse.propTypes = {
  courses: PropTypes.array,
  ids: PropTypes.array,
  change: PropTypes.func,
}

LibraryCourse.defaultProps = {
  courses: [],
  ids: [],
  change: () => {},
}

export default LibraryCourse
