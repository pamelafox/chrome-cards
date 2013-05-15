var CARDS_PREFIX = 'behavioralecon-';
var CARDS_DATA =[
    {
        "answer": "anchoring",
        "question": "A cognitive bias that describes the common human tendency to rely too heavily on the first piece of information offered (the \"anchor\") when making decisions.",
        "id": "anchoring",
        "category": "general"
    },
    {
        "answer": "asymmetric dominance",
        "question": "The phenomenon whereby consumers will tend to have a specific change in preference between two options when also presented with a third option that is inferior in all respects to one option; but, in comparison to the other option, it is inferior in some respects and superior in others. A higher percentage of consumers will prefer the dominating option than when the asymmetrically dominated option is absent. (starts with a)",
        "id": "asymmetric dominance",
        "category": "general"
    },
    {
        "answer": "choice architecture",
        "question": "Term describing how decisions can be influenced by how the choices are presented",
        "id": "choice architecture",
        "category": "general"
    },
    {
        "answer": "cognitive bias",
        "question": "pattern of deviation in judgment whereby inferences of other people and situations may be drawn in an illogical fashion.",
        "id": "cognitive bias",
        "category": "general"
    },
    {
        "answer": "coherent arbitrariness",
        "question": "Preferences are initially malleable, but become imprinted, i.e. precisely defined and largely invariant, after the individual has made an initial decision (self-herding). Absolute valuation can be manipulated, but subjects do not change their preferences once established.",
        "id": "coherent arbitrariness",
        "category": "general"
    },
    {
        "answer": "decoy effect",
        "question": "The phenomenon whereby consumers will tend to have a specific change in preference between two options when also presented with a third option that is inferior in all respects to one option; but, in comparison to the other option, it is inferior in some respects and superior in others. A higher percentage of consumers will prefer the dominating option than when the asymmetrically dominated option is absent. Synonym: Asymmetric dominance.",
        "id": "decoy effect",
        "category": "general"
    },
    {
        "answer": "expected utility",
        "question": "Theory of utility in which \"betting preferences\" of people with regard to uncertain outcomes (gambles) are represented by a function of the payouts (whether in money or other goods), the probabilities of occurrence, risk aversion, and the different utility of the same payout to people with different assets or personal preferences.",
        "id": "expected utility",
        "category": "general"
    },
    {
        "answer": "herding",
        "question": "Herd behavior describes how individuals in a group can act together without planned direction.",
        "id": "herding",
        "category": "general"
    },
    {
        "answer": "heuristic",
        "question": "Strategy using readily accessible, through loosely applicable, information to control problem solving in human beings and machines.",
        "id": "heuristic",
        "category": "general"
    },
    {
        "answer": "loss aversion",
        "question": "people's tendency to strongly prefer avoiding losses to acquiring gains. Some studies suggest that losses are twice as powerful, psychologically, as gains. First convincingly demonstrated by Amos Tversky and Daniel Kahneman.",
        "id": "loss aversion",
        "category": "general"
    },
    {
        "answer": "prospect theory",
        "question": "behavioral economic theory developed by Amos Tversky and Daniel Kahneman, describing the way people chose between probabilistic alternatives that involve risk, where the probabilities of outcomes are known. The theory states that people make decisions based on the potential value of losses and gains rather than the final outcome, and that they evaluate these losses and gains using certain heuristics. The model is descriptive: it tries to model real-life choices, rather than optimal decisions.",
        "id": "prospect theory",
        "category": "general"
    },
    {
        "answer": "status quo bias",
        "question": "Cognitive bias, irrational preference for the current state of affairs. The current baseline (or status quo) is taken as a reference point, and any change from that baseline is perceived as a loss.",
        "id": "status quo bias",
        "category": "general"
    },
    {
        "answer": "law of diminishing returns",
        "question": "States that in all productive processes, adding more of one factor of production, while holding all others constant (\"ceteris paribus\"), will at some point yield lower per-unit returns.",
        "id": "law of diminishing returns",
        "category": "general"
    },
    {
        "answer": "impulsive purchasing",
        "question": "Behavior that is not regulated and that results from an unplanned spontaneous impulse. In particular, impulsive purchasing involves getting a sudden urge to buy something without advance intention or plan and then acting on that impulse without carefully or thoroughly considering whether the purchase is consistent with one's long range goals, ideals, resolves, and plans.",
        "id": "impulsive purchasing",
        "category": "general"
    },
    {
        "answer": "mental accounting",
        "question": "We assign money to mental categories. This assignment determines how we feel about the money. We treat unassigned money differently.",
        "id": "mental accounting",
        "category": "general"
    },
    {
        "answer": "opportunity cost",
        "question": "What you are giving up by choosing one thing over another. Synonym: Shadow value of money.",
        "id": "opportunity cost",
        "category": "general"
    },
    {
        "answer": "3 components of the pain of paying",
        "question": "opportunity cost, hassle, moral tax",
        "id": "3 components of the pain of paying",
        "category": "general"
    },
    {
        "answer": "Shadow value of money",
        "question": "What you are giving up by choosing one thing over another. Synonym: Opportunity cost.",
        "id": "Shadow value of money",
        "category": "general"
    },
    {
        "answer": "Spendthrift",
        "question": "Consumer who experience minimal pain of payment and, therefore, ends up spending more than what he himself would consider as normatively appropriate (definition of Rick, Cryder, and Loewenstein). Opposite: Tightwad",
        "id": "Spendthrift",
        "category": "general"
    },
    {
        "answer": "Tightwad",
        "question": "Consumer whose affective reaction to spending may lead her to spend less than her more deliberative selves would prefer (definition of Rick, Cryder, and Loewenstein). Opposite: Spendthrift.",
        "id": "Tightwad",
        "category": "general"
    },
    {
        "answer": "Vice product",
        "question": "A product that is often bought impulsively, even though consumers consider the products to be unhealthy and experience regret after the purchase. Opposite: Virtue product.",
        "id": "Vice product",
        "category": "general"
    },
    {
        "answer": "Anosognosia",
        "question": "A self-deceptive disorder in which people who have sustained an injury to some part of their body deny the reality of their injury.",
        "id": "Anosognosia",
        "category": "general"
    },
    {
        "answer": "Automated process",
        "question": "Process taking place in the absence of effort, awareness, and intention and typically running to completion once initiated.",
        "id": "Automated process",
        "category": "general"
    },
    {
        "answer": "Categorization malleability",
        "question": "The availability of ways to categorize dishonest actions in more compatible terms and find rationalizations for them.",
        "id": "Categorization malleability",
        "category": "general"
    },
    {
        "answer": "Cognitive load",
        "question": "The strain resulting from having to maintain two types of content simultaneously in working memory. Among the cues associated with cognitive load are pausing and simplified sentence structure. One of the cues of deception.",
        "id": "Cognitive load",
        "category": "general"
    },
    {
        "answer": "Controlled process",
        "question": "Process involving conscious effort, awareness, and intention, that can be stopped at will.",
        "id": "Controlled process",
        "category": "general"
    },
    {
        "answer": "Descriptive norms",
        "question": "Norms specifying what most people do in a particular situation. To be distinguished from injunctive norms.",
        "id": "Descriptive norms",
        "category": "general"
    },
    {
        "answer": "Fudge Factor",
        "question": "The amount of cheating you allow yourself before you start thinking of yourself as dishonest. The fudge factor shrinks when people are reminded of moral codes. It expands when the distance from money is increased (e.g. by using tokens) and when we see other people cheating.",
        "id": "Fudge Factor",
        "category": "general"
    },
    {
        "answer": "Injunctive norms",
        "question": "Norms specifying the particular behaviors that most people approve or disapprove of. To be distinguished from descriptive norms.",
        "id": "Injunctive norms",
        "category": "general"
    },
    {
        "answer": "Level of mutability of the stimulus",
        "question": "The level of mutability of the stimulus (e.g. information, object, circumstances) is the extent to which this stimulus is modifiable. Low mutability suggests that it is very difficult to imagine the situation had been different, while high mutability means that this is easy.",
        "id": "Level of mutability of the stimulus",
        "category": "general"
    },
    {
        "answer": "Licensing effect",
        "question": "The subconscious phenomenon whereby increased confidence and security in one's self-image or self-concept tends to make that individual worry less about the consequences of subsequent immoral behavior and, therefore, more likely to make immoral choices and act immorally. Synonym: self-licensing.",
        "id": "Licensing effect",
        "category": "general"
    },
    {
        "answer": "Macbeth effect",
        "question": "A threat to one's moral purity induces the need to cleanse oneself.",
        "id": "Macbeth effect",
        "category": "general"
    },
    {
        "answer": "Malingering",
        "question": "Telling lies to obtain sickness benefits.",
        "id": "Malingering",
        "category": "general"
    },
    {
        "answer": "Mental dualism",
        "question": "Mental process that ensures that the mental processes that are the target of self-deception do not have access to the same information as the mental processes deceiving the self. Types of dualisms: implicit versus explicit memory, implicit versus explicit attitudes, and automatic versus controlled processes.",
        "id": "Mental dualism",
        "category": "general"
    },
    {
        "answer": "Norm theory",
        "question": "Theory presented by Kahneman and Miller, postulating that norms are computed after the event has occurred rather than in advance. Specifically, they proposed that each stimulus selectively recruits its own alternatives and is interpreted in a rich context of remembered and constructed representations of what it could have been, might have been, or should have been.",
        "id": "Norm theory",
        "category": "general"
    },
    {
        "answer": "Norm-focus theory",
        "question": "Social context determines whether people attend to descriptive or injunctive norms at a particular time and how these norms will impinge on an individual's immediate behavior.",
        "id": "Norm-focus theory",
        "category": "general"
    },
    {
        "answer": "Potential awareness",
        "question": "Situation in which the individual consciously knows the welcome information that has been gathered but also has some awareness that unwelcome information could be around the next corner.",
        "id": "Potential awareness",
        "category": "general"
    },
    {
        "answer": "Self-affirmation",
        "question": "Reflecting on their important values or past positive behaviors, people are reminded that they are moral and efficacious individuals, affirming their self-worth. A cornerstone of this theory is the idea that specific attacks on one's abilities or morals (e.g. failure on a test) do not need to be dealt with directly, but rather can be addressed at a more general level by restoring or reaffirming a global sense of self-worth.",
        "id": "Self-affirmation",
        "category": "general"
    },
    {
        "answer": "Self-deception",
        "question": "an information-processing bias that gives priority to welcome over unwelcome information in a manner that reflect the individual's goals. Examples: biased information search strategies, biased interpretive processes, biased memory processes, rationalization and convincing the self that a lie is true (according to Von Hippel and Trivers).",
        "id": "Self-deception",
        "category": "general"
    },
    {
        "answer": "Self-licensing",
        "question": "The subconscious phenomenon whereby increased confidence and security in one's self-image or self-concept tends to make that individual worry less about the consequences of subsequent immoral behavior and, therefore, more likely to make immoral choices and act immorally. (also - licensing effect).",
        "id": "Self-licensing",
        "category": "general"
    },
    {
        "answer": "Self-verification",
        "question": "Accurately gauging one's abilities (reality-oriented).",
        "id": "Self-verification",
        "category": "general"
    },
    {
        "answer": "Simple model of rational crime",
        "question": "States that whether people commit a crime or not is determined by a cost benefit analysis. The potential benefits are the amount to be gained, the potential costs are the risk of getting caught and the punishment. There is no morality involved.",
        "id": "Simple model of rational crime",
        "category": "general"
    },
    {
        "answer": "Social identity theory",
        "question": "Theory according to which group members tend to use their own group to maintain or enhance a positive social identity and self-esteem, and as a consequence are motivated to conform with norms that provide them with an in-group identity, rather than an out-group one.",
        "id": "Social identity theory",
        "category": "general"
    },
    {
        "answer": "Social proof",
        "question": "Proof that someone from your group, from your background behaves in the same way.",
        "id": "Social proof",
        "category": "general"
    },
    {
        "answer": "Sunshine policy",
        "question": "Policy intended to achieve greater \"transparency\" and thereby reduce nepotism, corruption, collusion, cronyism, conflicts of interest, etc. It comes for a famous quote by Supreme Court Justice Louis Brandeis, \"Sunshine is the best disinfectant\", meaning that transparency will prevent dishonesty and conflicts of interest.",
        "id": "Sunshine policy",
        "category": "general"
    },
    {
        "answer": "Suppression",
        "question": "Situation in which, in an effort to control nonverbal signs of nervousness that might reveal deceptive intent, people try to control their face, trunk, and limbs. One of the cues of deception.",
        "id": "Suppression",
        "category": "general"
    },
    {
        "answer": "Symbolic self-completion",
        "question": "People are motivated to complete their self- definitions (e.g., musicians) when indicators or symbols of this definition are lacking (e.g., skills) by engaging in activities that complete the symbols (e.g., training). Thus, when moral self-definition is at stake, such as when one has indulged in morally questionable activities, one should naturally be motivated to engage in activities that will restore moral integrity.",
        "id": "Symbolic self-completion",
        "category": "general"
    },
    {
        "answer": "Ultimatum bargaining game",
        "question": "proposer offers a division of a commodity (e.g., chips to be converted to money), and a responder can accept or reject the proposed division. If the responder accepts, the commodity is divided as proposed; if the responder rejects, neither party receives anything.",
        "id": "Ultimatum bargaining game",
        "category": "general"
    },
    {
        "answer": "Authority ranking relationship (AR)",
        "question": "Relationship recognized by its clear superior-subordinate relationships (see Fiske's relational theory).",
        "id": "Authority ranking relationship (AR)",
        "category": "general"
    },
    {
        "answer": "BDM Procedure",
        "question": "Becker-DeGroot-Marschak (1964) procedure, asking participants to make a bid on their product between 0 and 100 cents (pretesting revealed that no participant bid more than $1.00). A random number is then drawn between 0 and 100; if participants' number is equal to or above that number, they pay that amount and take their creation home, if their bid is below the number, they don't buy it.",
        "id": "BDM Procedure",
        "category": "general"
    },
    {
        "answer": "Choking under pressure",
        "question": "Happens when increased motivation results in a decrement in performance.",
        "id": "Choking under pressure",
        "category": "general"
    },
    {
        "answer": "Cognitive dissonance",
        "question": "The tension that results when there is a mismatch between our beliefs and our actions. We cannot change what we did but we can change what we believe, so that's what we do.",
        "id": "Cognitive dissonance",
        "category": "general"
    },
    {
        "answer": "Communal sharing relationship (CS)",
        "question": "Relationship earmarked by High levels of cooperation and ''we-ness'' (see Fiske's relational theory).",
        "id": "Communal sharing relationship (CS)",
        "category": "general"
    },
    {
        "answer": "Contrafreeloading",
        "question": "The behavior in which animals offered the choice between eating food provided to them for free or working to get that food would eat the most food from the source that required effort.",
        "id": "Contrafreeloading",
        "category": "general"
    },
    {
        "answer": "Deterrence hypothesis",
        "question": "Prediction that the introduction of a penalty that leaves everything else unchanged will reduce the occurrence of the behavior subject to the fine.",
        "id": "Deterrence hypothesis",
        "category": "general"
    },
    {
        "answer": "Effectance",
        "question": "Ability to successfully produce desired outcomes in one's environment.",
        "id": "Effectance",
        "category": "general"
    },
    {
        "answer": "Effort justification",
        "question": "The more effort people put into some pursuit, the more they come to value it.",
        "id": "Effort justification",
        "category": "general"
    },
    {
        "answer": "Equality matching relationship (EM)",
        "question": "EM relationships lie somewhere between CS and AR relationships--they are very structured but exhibit equality. In EM relationships, everybody receives the same rewards, and reci- procity is monitored to ensure that the scales never get too far out of balance (see Fiske's relational theory).",
        "id": "Equality matching relationship (EM)",
        "category": "general"
    },
    {
        "answer": "Fiske's relational theory",
        "question": "Fiske's model posits four basic types of social relationships: communal sharing (CS), authority ranking (AR), equality matching (EM), and market pricing (MP) .",
        "id": "Fiske's relational theory",
        "category": "general"
    },
    {
        "answer": "Idiosyncratic fit",
        "question": "The fact that a given solution fits your very personal needs very well.",
        "id": "Idiosyncratic fit",
        "category": "general"
    },
    {
        "answer": "IKEA effect",
        "question": "Labor alone can be sufficient to induce greater liking for the fruits of one's labor: Even constructing a standardized bureau, an arduous, solitary task, can lead people to overvalue their (often poorly constructed) creations. Named after IKEA, the Swedish manufacturer whose products typically arrive with some assembly required.",
        "id": "IKEA effect",
        "category": "general"
    },
    {
        "answer": "Market pricing relationship (MP)",
        "question": "Relationship involving ongoing cost-benefit analysis, and participants' payments for their labor are based on a wage rate that reflects the amount and quality of the work performed (see Fiske's relational theory).",
        "id": "Market pricing relationship (MP)",
        "category": "general"
    },
    {
        "answer": "Not invented here syndrome",
        "question": "Syndrome in which people, e.g. managers, refuse to use perfectly good ideas developed elsewhere in favor of their \" sometimes inferior \" internally-developed ideas.",
        "id": "Not invented here syndrome",
        "category": "general"
    },
    {
        "answer": "Social facilitation paradigm",
        "question": "The tendency for people to do better on tasks when in the presence of other people. This works only if we are good at the task. If the task is novel, performance will be worse.",
        "id": "Social facilitation paradigm",
        "category": "general"
    },
    {
        "answer": "Sunk cost effect",
        "question": "The fact that people continue to devote resources to failing projects in which they have previously invested.",
        "id": "Sunk cost effect",
        "category": "general"
    },
    {
        "answer": "Toothbrush theory",
        "question": "We all need a toothbrush, we all want a toothbrush, but nobody wants to use anybody else's toothbrush. We want to create our own ideas and theories, but we don't want to rely on the ideas of others.",
        "id": "Toothbrush theory",
        "category": "general"
    },
    {
        "answer": "Yerkes-Dodson law",
        "question": "posits that there is an optimal level of arousal for executing tasks, and that departures from this level in either direction lead to a decrement in performance.",
        "id": "Yerkes-Dodson law",
        "category": "general"
    },
    {
        "answer": "Action control theory",
        "question": "Self-regulation theory suggesting that after choosing a course of action, people focus on how to effectively implement the chosen course of action and disregard or downplay alternatives.",
        "id": "Action control theory",
        "category": "general"
    },
    {
        "answer": "Adam-and-Eve problem",
        "question": "Would you sacrifice eternity in the garden of Eden for an apple? (No, but I would for knowledge of good and evil :-))",
        "id": "Adam-and-Eve problem",
        "category": "general"
    },
    {
        "answer": "Binding behavior",
        "question": "The voluntary imposition of constraints (that are costly to overcome) on one's future choices in a strategic attempt to resist future temptations.",
        "id": "Binding behavior",
        "category": "general"
    },
    {
        "answer": "Bounded rationality",
        "question": "The idea that in decision-making, rationality of individuals is limited by the information they have, the cognitive limitations of their minds, and the finite amount of time they have to make a decision. It was proposed by Herbert A. Simon as an alternative basis for the mathematical modeling of decision making, as used in economics and related disciplines",
        "id": "Bounded rationality",
        "category": "general"
    },
    {
        "answer": "Counteractive control",
        "question": "A variety of cognitive, affective, and motivational processes in order to counteract the influence of short-term costs and, thus, secure long-term outcomes when faced with a self-control dilemma in which short-term costs are in opposition to long-term outcomes (e.g. discomfort of medical checkup vs long-term health benefits).",
        "id": "Counteractive control",
        "category": "general"
    },
    {
        "answer": "Counteractive control theory (CCT)",
        "question": "Valenced short-term outcomes may elicit more intense self-control efforts that, in turn, act to increase the likelihood of choosing according to long-term outcomes.",
        "id": "Counteractive control theory (CCT)",
        "category": "general"
    },
    {
        "answer": "Counterfactual thinking",
        "question": "The tendency people have to imagine alternatives to reality (what if...).",
        "id": "Counterfactual thinking",
        "category": "general"
    },
    {
        "answer": "Descriptive theories",
        "question": "Simply model how people actually choose, often by stressing systematic departures from the normative theory.",
        "id": "Descriptive theories",
        "category": "general"
    },
    {
        "answer": "Ego depletion",
        "question": "When we are continually exerting self-control, our ability to resist temptation weakens.",
        "id": "Ego depletion",
        "category": "general"
    },
    {
        "answer": "Hyperbolic time discounting",
        "question": "Immediately available rewards have a disproportionate effect on preferences relative to more delayed rewards, causing a time-inconsistent taste for immediate gratification.",
        "id": "Hyperbolic time discounting",
        "category": "general"
    },
    {
        "answer": "Intertemporal discounting",
        "question": "The tendency of people to discount rewards as they approach a temporal horizon in the future or the past (i.e., become so distant in time that they cease to be valuable or to have additive effects). To put it another way, it is a tendency to give greater value to rewards as they move away from their temporal horizons and towards the \"now\".",
        "id": "Intertemporal discounting",
        "category": "general"
    },
    {
        "answer": "Libertarian paternalism",
        "question": "A philosophy that advocates designing institutions that help people make better decisions but do not impinge on their freedom to choose. Automatic enrollment is a good example of libertarian paternalism.",
        "id": "Libertarian paternalism",
        "category": "general"
    },
    {
        "answer": "Life cycle theory of saving",
        "question": "Households are assumed to want to smooth consumption over the life cycle and are expected to solve the relevant optimization problem in each period before deciding how much to consume and how much to save. Actual household behavior might differ from this optimal plan.",
        "id": "Life cycle theory of saving",
        "category": "general"
    },
    {
        "answer": "Normative theories",
        "question": "Characterize rational choice and are often derived by solving some kind of optimization prob- lem. The life cycle hypothesis is an example of a normative theory of saving since it is based on the solution to a lifetime consumption-smoothing problem.",
        "id": "Normative theories",
        "category": "general"
    },
    {
        "answer": "Opt-out",
        "question": "scheme to encourage socially desirable outcome by making that outcome the default option, requiring no effortful self-control.",
        "id": "Opt-out",
        "category": "general"
    },
    {
        "answer": "Personal decision",
        "question": "A situation where an individual can make a choice among two or more alternatives. This assumes that the individual recognizes that he or she has a choice and has control of this choice.",
        "id": "Personal decision",
        "category": "general"
    },
    {
        "answer": "Prescriptive theories",
        "question": "Attempts to help people improve their decision making and become closer to the normative ideal. (these are often second best)",
        "id": "Prescriptive theories",
        "category": "general"
    },
    {
        "answer": "Present focus bias",
        "question": "The tendency to give more weight to our current environment or state.",
        "id": "Present focus bias",
        "category": "general"
    },
    {
        "answer": "Readily available alternatives",
        "question": "Alternatives that the decision maker would have known about and could have chosen without investing much time or money.",
        "id": "Readily available alternatives",
        "category": "general"
    },
    {
        "answer": "Regret",
        "question": "The comparison between where we are in life and where we could have been.",
        "id": "Regret",
        "category": "general"
    },
    {
        "answer": "Regret or dissonance reduction processes",
        "question": "Attempts to justify engagement in a costly course of action. The greater the costs associated with a course of action, the greater the need to justify engaging in it.",
        "id": "Regret or dissonance reduction processes",
        "category": "general"
    },
    {
        "answer": "Reward substitution",
        "question": "Using an alternate reward that is immediate and therefore more motivating. Reward substitution can get us to act like we care about the world while we really care about our image.",
        "id": "Reward substitution",
        "category": "general"
    },
    {
        "answer": "Self-control",
        "question": "An umbrella construct that bridges concepts and measurements from different disciplines (e.g. impulsivity, conscientiousness, self-regulation, delay of gratification, inattention-hyperactivity, executive function, willpower, intertemporal choice).",
        "id": "Self-control",
        "category": "general"
    },
    {
        "answer": "Save More Tomorrow? (or SMarT)",
        "question": "Program to help people save more. The basic idea is to give workers the option of committing themselves now to increasing their savings rate later, each time they get a raise.",
        "id": "Save More Tomorrow? (or SMarT)",
        "category": "general"
    },
    {
        "answer": "Target-hardening",
        "question": "A crime reduction policy aimed at discouraging would-be offenders by making law-breaking require effortful planning (e.g. antitheft devices require more advance planning to steal a car).",
        "id": "Target-hardening",
        "category": "general"
    },
    {
        "answer": "Time-inconsistent preferences",
        "question": "Humans have a systematic tendency to switch towards \"vices\" (products or activities which are pleasant in the short term) from \"virtues\" (products or activities which are seen as valuable in the long term) as the moment of consumption approaches, even if this involves changing decisions made in advance. Consider having the choice between getting the day off work tomorrow or getting a day and a half off work one month from now. Suppose you would choose one day off tomorrow. Now suppose that you were asked to make that same choice ten years ago. That is, you were asked then whether you would prefer getting one day off in ten years or getting one and a half days off in ten years and one month. Suppose that then you would have taken the day and a half off. This would be a case of time inconsistency because your relative preferences for tomorrow versus one month from now would be different at two different points in time - namely now versus ten years ago. The decision made ten years ago indicates a preference for delayed gratification, but the decision made just before the fact indicates a preference for immediate pleasure.",
        "id": "Time-inconsistent preferences",
        "category": "general"
    },
    {
        "answer": "Ulysses contract",
        "question": "Contract in which you know your future self will be tempted and you bind your current self to prevent your future self from misbehaving.",
        "id": "Ulysses contract",
        "category": "general"
    },
    {
        "answer": "Affect",
        "question": "The positive and negative feelings that combine with reasoned analysis to guide our judgments, decisions, and actions; the sense (not necessarily conscious) that something is good or bad.",
        "id": "Affect",
        "category": "general"
    },
    {
        "answer": "Dread risk",
        "question": "A low-probability, high-consequence event, such as the terrorist attack on September 11, 2001.",
        "id": "Dread risk",
        "category": "general"
    },
    {
        "answer": "Dual-process theories of thinking",
        "question": "Theory that \"people apprehend reality in two fundamentally different ways, one variously labeled intuitive, automatic, natural, nonverbal, narrative, and experiential, and the other analytical, deliberative, verbal, and rational (Epstein). Stanovich and West (2000) labeled these two modes of thinking System 1 and System 2. One of the characteristics of System 1, the experiential or intuitive system, is its affective basis. Although analysis (System 2) is certainly important in many decision-making circumstances, reliance on affect and emotion is generally a quicker, easier, and more efficient way to navigate in a complex, uncertain and sometimes dangerous world.",
        "id": "Dual-process theories of thinking",
        "category": "general"
    },
    {
        "answer": "Hot-cold empathy gaps",
        "question": "Misjudgments that occur between different visceral states.",
        "id": "Hot-cold empathy gaps",
        "category": "general"
    },
    {
        "answer": "Identifiable victim effect",
        "question": "We care more about suffering when it is represented by one individual.",
        "id": "Identifiable victim effect",
        "category": "general"
    },
    {
        "answer": "Intra-empathy gap",
        "question": "Our inability to make predictions about our future actions in an emotional state.",
        "id": "Intra-empathy gap",
        "category": "general"
    },
    {
        "answer": "Projection bias",
        "question": "The tendency to overpredict the degree to which one's future tastes will resemble one's current tastes",
        "id": "Projection bias",
        "category": "general"
    },
    {
        "answer": "Psychophysical function",
        "question": "Function characterizing our diminished sensitivity to a wide range of perceptual and cognitive entities--brightness, loudness, heaviness, and money--as their underlying magnitudes increase.",
        "id": "Psychophysical function",
        "category": "general"
    },
    {
        "answer": "Psychophysical numbing",
        "question": "Diminished sensitivity to the value of life.",
        "id": "Psychophysical numbing",
        "category": "general"
    },
    {
        "answer": "Qualia",
        "question": "The feeling of emotions; the internal and subjective component of sense perceptions, arising from stimulation of the senses by phenomena.",
        "id": "Qualia",
        "category": "general"
    },
    {
        "answer": "Region beta-paradox",
        "question": "Intense hedonic states trigger psychological processes that are designed to attenuate them, and thus intense states may abate more quickly than mild states. Because people are unaware of these psychological processes, they may mistakenly expect intense states to last longer than mild ones. In Study 1, participants predicted that the more they initially disliked a transgressor, the longer their dislike would last. In Study 2, participants predicted that their dislike for a transgressor who hurt them a lot would last longer than their dislike for a transgressor who hurt them a little, but precisely the opposite was the case. In Study 3, participants predicted that their dislike for a transgressor who hurt them a lot would last longer than their dislike for a transgressor who hurt someone else a lot, but precisely the opposite was the case. These errors of prediction are discussed as instances of a more general phenomenon known as the region-beta paradox",
        "id": "Region beta-paradox",
        "category": "general"
    },
    {
        "answer": "Trolley problem",
        "question": "A thought experiment in ethics, first introduced by Philippa Foot in 1967. The general form of the problem is this: Person A can take an action which would benefit many people, but in doing so, person B would be unfairly harmed. Under what circumstances would it be morally just for Person A to violate Person B's rights in order to benefit the group?",
        "id": "Trolley problem",
        "category": "general"
    },
    {
        "answer": "Visceral factor",
        "question": "A wide range of negative emotions (anger, fear), drive states (hunger, thirst, sexual desire) and feeling states (pain) that grab people's attention and motivate them to engage in specific behaviors. Unlike preferences they can change desire rapidly because they are affected by changing internal bodily states and external stimuli. Can be modeled as 'state-dependent preferences' motivating people to engage in specific behaviors through the combined application of carrots and sticks.",
        "id": "Visceral factor",
        "category": "general"
    }
];
