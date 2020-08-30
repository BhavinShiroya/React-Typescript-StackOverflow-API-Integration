import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { getQuestionsList } from './../../api/getQuestionsList';
import { Items, QuestionTypes } from './../../types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface QuestionListProps {
}

const QuestionList: React.FC<QuestionListProps> = ({ }) => {
  const [questions, setQuestions] = React.useState<Items[]>([]);
  const [isLoadMore, setIsLoadMore] = React.useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = React.useState<Items>();
  const [page, setPage] = React.useState<number>(1);
  const [error, setError] = React.useState<string>('');
  const [modal, setModal] = React.useState(false);
  const pageSize: number = 30;

  //call hooks base on page value change
  React.useEffect(() => {
    fetchData();
  }, [page]);

  //fetch questions from api call.
  const fetchData = async () => {
    const result: QuestionTypes = await getQuestionsList({ page, pageSize });
    if (result.items) {
      (result && result.has_more) ? setIsLoadMore(true) : setIsLoadMore(false);
      const key = 'question_id';
      let beforeFilterArray: Items[] = !!questions.length ? [...questions, ...result.items] : result.items;
      let afterFilterArray: Items[] = [...new Map(beforeFilterArray.map(item => [item[key], item])).values()];
      setQuestions(afterFilterArray);
    } else {
      setError('Somthing went wrong!!! Please Check you network connection');
    }
  };

  //load more questions
  const loadMoreQuestion = () => {
    if (isLoadMore) {
      setPage(page + 1);
    }
  }

  //onLink click
  const onModalClick = (question?: Items) => {
    setSelectedQuestion(question);
    setModal(!modal);
  }

  const timeConverter = (UNIX_timestamp: number) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }


  return (
    <>
      <ListGroup>
        {!!questions.length && (
          <InfiniteScroll
            dataLength={questions.length}
            next={loadMoreQuestion}
            scrollThreshold={0.8}
            hasMore={isLoadMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }>
            {questions.map((question: Items) => (
              <ListGroupItem className="justify-content-between" key={question.question_id} tag="a" href="#" action onClick={() => onModalClick(question)}>
                <>
                  {question.title}
                  <Badge pill color="primary">{question.owner.display_name}</Badge>
                  <Badge pill color="info">{timeConverter(question.creation_date)}</Badge>
                </>
              </ListGroupItem>
            ))}
          </InfiniteScroll>
        )}
        {error && (<p>{error}</p>)}
      </ListGroup>
      <Modal isOpen={modal}>
        <ModalHeader>{selectedQuestion?.title}</ModalHeader>
        <ModalBody>
          <a href={selectedQuestion?.link} target="_blank">{selectedQuestion?.link}</a>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => onModalClick()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default QuestionList;
