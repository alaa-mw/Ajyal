import { Box, Button, Paper, Typography, TextField, Checkbox, IconButton } from '@mui/material';
import { AddCircle, RemoveCircle, ExpandMore, ExpandLess, QuestionAnswerOutlined } from '@mui/icons-material';
import { Question, Quiz } from '../../interfaces/Quiz';

interface QuestionsStepProps {
  quiz: Quiz;
  onAddQuestion: (parentPath: number[] | null) => void;
  onRemoveQuestion: (qPath: number[]) => void;
  onQuestionChange: (qPath: number[], field: string, value: any) => void;
  onChoiceChange: (qPath: number[], cIndex: number, field: string, value: any) => void;
  onAddChoice: (qPath: number[]) => void;
  onRemoveChoice: (qPath: number[], cIndex: number) => void;
  onToggleExpand: (qPath: number[]) => void;
}

export const QuestionsStep = ({
  quiz,
  onAddQuestion,
  onRemoveQuestion,
  onQuestionChange,
  onChoiceChange,
  onAddChoice,
  onRemoveChoice,
  onToggleExpand
}: QuestionsStepProps) => {

  const renderQuestions = (questions: Question[], path: number[] = []) => {
    return questions.map((question, index) => {
      const currentPath = [...path, index];
      const hasChildren = question.children && question.children.length > 0;

      return (
        <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, ml: path.length * 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <QuestionAnswerOutlined color="action" />
              <Typography variant="subtitle1">
                {path.length === 0 ? `السؤال ${index + 1}` : `السؤال الفرعي ${index + 1}`}
              </Typography>
              {hasChildren && (
                <IconButton size="small" onClick={() => onToggleExpand(currentPath)}>
                  {question.expanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
            </Box>
            <Box>
              <IconButton 
                size="small" 
                onClick={() => onAddQuestion(currentPath)}
                color="primary"
              >
                <AddCircle fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                onClick={() => onRemoveQuestion(currentPath)}
                color="error"
                disabled={questions.length <= 1 && path.length === 0}
              >
                <RemoveCircle fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="نص السؤال"
            multiline
            rows={2}
            value={question.question_text}
            onChange={(e) => onQuestionChange(currentPath, 'question_text', e.target.value)}
          />

          <TextField
            sx={{ mb: 2, width: 100 }}
            label="الدرجة"
            type="number"
            value={question.mark}
            onChange={(e) => onQuestionChange(currentPath, 'mark', parseFloat(e.target.value))}
          />

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
            الخيارات (حدد الإجابات الصحيحة)
          </Typography>
          
          {question.choices.map((choice, cIndex) => (
            <Box key={cIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Checkbox
                checked={choice.is_correct}
                onChange={(e) => onChoiceChange(currentPath, cIndex, 'is_correct', e.target.checked)}
              />
              <TextField
                fullWidth
                value={choice.choice_text}
                onChange={(e) => onChoiceChange(currentPath, cIndex, 'choice_text', e.target.value)}
                placeholder={`الخيار ${cIndex + 1}`}
              />
              <IconButton 
                onClick={() => onRemoveChoice(currentPath, cIndex)} 
                disabled={question.choices.length <= 2}
                color="error"
                size="small"
              >
                <RemoveCircle fontSize="small" />
              </IconButton>
            </Box>
          ))}

          <Button 
            startIcon={<AddCircle fontSize="small" />} 
            onClick={() => onAddChoice(currentPath)}
            size="small"
            sx={{ mt: 1 }}
          >
            إضافة خيار
          </Button>

          {hasChildren && question.expanded && (
            <Box sx={{ mt: 2, pl: 2, borderLeft: 2, borderColor: 'divider' }}>
              {renderQuestions(question.children!, currentPath)}
            </Box>
          )}
        </Paper>
      );
    });
  };

  return (
    <Box>
      {renderQuestions(quiz.questions)}
      
      <Button 
        variant="outlined" 
        startIcon={<AddCircle />} 
        onClick={() => onAddQuestion(null)}
        sx={{ mt: 2 }}
      >
        إضافة سؤال رئيسي
      </Button>
    </Box>
  );
};