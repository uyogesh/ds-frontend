import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import DevActions from '../../actions/develop';
import PropTypes from 'prop-types';
import { equals, contains, length, filter } from 'ramda';
import Icon from '../Icon';
import './LearnChildQuiz.scss';

class LearnChildQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      optionValues: [],
      submitted: false,
    };
    this.props.getQuestion(this.props.quizId);
  }

  // Quiz module
  getQuestions() {
    this.setState({ submitted: false })
  }

  submit() {
    const { quizQuestion, quizId } = this.props;
    const { inputValue, optionValues } = this.state;
    if (equals(length(optionValues), 0) && equals(inputValue, '')) {
      alert('please select any answer!');
      return;
    }

    if (equals(quizQuestion.type, 3) || equals(quizQuestion.type, 4)) {
      const payload = {
        "answered": optionValues
      };
      this.props.submitAnswer(quizId, payload);
    } else {
      const payload = {
        "answered": [ inputValue ]
      };
      this.props.submitAnswer(quizId, payload);
    }
    this.setState({ inputValue: '', optionValues: [], submitted: true });
  }

  updateInputValue = evt => {
    const target = evt.target;
    this.setState({ inputValue: target.value });
  }

  changeItems(ind) {
    const { optionValues } = this.state;
    if (contains(ind + 1, optionValues)) {
      const values = filter(item => item !== ind+1, optionValues);
      this.setState({ optionValues: values });
    } else {
      optionValues.push(ind + 1);
      this.setState({ optionValues });
    }
  }

  render() {
    const { inputValue, optionValues, submitted } = this.state;
    const { quizQuestion, answers, name } = this.props;
    const { num, title, type, options, completed } = quizQuestion;

    return (
      <div className="learn-question">
        {completed ? (
          <div className="align-items-center justify-content-center">
            {equals(answers.correct, 0) && !answers.error && submitted ? (
              <div className="flex-column align-items-center">
                <p className="my-10">{`Your answer is incorrect!`}</p>
                <p className="my-10">{`The correct answer is ${answers.answer}.`}</p>
                <Button className="btn-next my-10 bg-primary" onClick={()=>this.getQuestions()}>Next</Button>
              </div>
            ) : (
              <div className="flex-column align-items-center">
                <p className="dsl-p16 my-10">{`Congratulations!`}</p>
                <p className="dsl-b14 my-10">{`You passed with 9/10 correct.`}</p>
                <Button className="btn-next my-10 bg-primary" onClick={()=>this.props.onFinish()}>Finish</Button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="dsl-p16">{name}</p>
            {equals(answers.correct, 0) && !answers.error && submitted ? (
              <div>
                <p className="my-10">{`Your answer is incorrect!`}</p>
                <p className="my-10">{`The correct answer is ${answers.answer}.`}</p>
                <Button className="btn-next my-10 bg-primary" onClick={()=>this.getQuestions()}>Next</Button>
              </div>
            ) : (
              <div>
                <p>{`${num}. ${title}`}</p>
                {(equals(type, 1) || equals(type, 2)) &&
                  <div className="my-10">
                    <input value={inputValue} placeholder="input your answer" onChange={this.updateInputValue}/>
                  </div>
                }
                {(equals(type, 3) || equals(type, 4)) &&
                  <Row className="mx-0">
                    {options.map((option, index) => {
                      return (
                        <Col
                          key={`option${index}`}
                          xs={12} sm={6}
                          className="d-flex mb-10 cursor-pointer"
                          onClick={()=>this.changeItems(index)}
                        >
                          <div className="radio-item">
                            {contains(index+1, optionValues) &&
                              <Icon name="fas fa-circle" color="#343f4b" size={11}/>
                            }
                          </div>&nbsp;&nbsp;
                          {option}
                        </Col>
                      )
                    })}
                  </Row>
                }
                {equals(type, 5) &&
                  <div className="my-10">
                    <textarea value={inputValue} placeholder="input your answer" onChange={this.updateInputValue}></textarea>
                  </div>
                }
                <Button className="btn-next bg-primary" onClick={()=>this.submit()}>Next</Button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isBusy: equals(state.app.status, 'pending'),
  quizQuestion: state.develop.learnQuizQuestions,
  answers: state.develop.learnQuizAnswers,
});

const mapDispatchToProps = dispatch => ({
  getQuestion: id => dispatch(DevActions.questionRequest(id)),
  submitAnswer: (id, payload) => dispatch(DevActions.answerRequest(id, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LearnChildQuiz);
